import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // required field checks
    if (!userName)
      return res.status(400).json({ message: "Staff Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check staff/admin exist
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user in db
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role: "staff",
      shop: req.shop._id,
    });

    if (newUser) {
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
      });
    } else {
      res.status(400).json({ message: "Invalid staff data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const originalAdmin = await User.findOne({
      shop: req.shop._id,
      role: "admin",
    }).sort({ createdAt: 1 });

    const users = await User.find({
      shop: req.shop._id,
      _id: { $ne: originalAdmin?._id },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      shop: req.shop?._id,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    const user = await User.findOne({ _id: req.params.id, shop: req.shop._id });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.userName = userName || user.userName;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }
    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      // hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    if (role && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can change roles" });
    }

    await user.save();

    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in updateUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      shop: req.shop._id,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
