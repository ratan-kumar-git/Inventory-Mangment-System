import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Shop from "../models/Shop.js";

// Generate JWT Token
const generateToken = (userId, shopId) => {
  return jwt.sign({ userId, shopId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const signupController = async (req, res) => {
  const { shopName, address, contact, userName, email, password } = req.body;
  try {
    // required field checks
    if (!shopName)
      return res.status(400).json({ message: "Shop name is required" });
    if (!address)
      return res.status(400).json({ message: "Address is required" });
    if (!contact)
      return res.status(400).json({ message: "Contact is required" });
    if (!userName)
      return res.status(400).json({ message: "Owner Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check user exist
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new shop in db
    const newShop = new Shop({
      shopName,
      address,
      contact,
    });

    if (newShop) {
      await newShop.save();
    } else {
      return res.status(400).json({ message: "Shop not created" });
    }

    // create new user in db
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role: "admin",
      shop: newShop._id,
    });

    //genrate jwt and send resonse
    if (newUser) {
      await newUser.save();
      res.status(201).json({
        user: {
          _id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          role: newUser.role,
          shopId: newShop._id,
          shopName: newShop.shopName,
          address: newShop.address,
          contact: newShop.contact,
        },
        token: generateToken(newUser._id, newShop._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    // find user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentails" });
    }

    // comapre and check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentails" });
    }

    const shop = await Shop.findOne({ _id: user.shop });

    // generate token and send response
    res.status(200).json({
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        shopId: shop._id,
        shopName: shop.shopName,
        address: shop.address,
        contact: shop.contact,
      },
      token: generateToken(user._id, shop._id),
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuthController = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("shop");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error in getProfileController:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const {
      userName,
      email,
      shopName,
      address,
      contact,
      currentPassword,
      newPassword,
    } = req.body;

    // find user
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    const shop = await Shop.findById(user.shop);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    // update user
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    await user.save();

    // update shop
    if (shopName) shop.shopName = shopName;
    if (address) shop.address = address;
    if (contact) shop.contact = contact;
    await shop.save();

    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      shop,
    });
  } catch (error) {
    console.error("Error in updateProfileController:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
