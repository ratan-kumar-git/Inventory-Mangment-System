import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Shop from "../models/Shop.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token = req.headers.authorization || req.headers.Authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.shop = await Shop.findById(decoded.shopId).select("-__v");
      req.user = await User.findById(decoded.userId).select("-password -__v");

      if (!req.user || !req.shop) {
        return res
          .status(401)
          .json({ message: "Invalid token: user or shop not found" });
      }
      next();
    } else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware for Admin-only access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, only admins allowed" });
  }
};
