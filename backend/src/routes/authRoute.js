import express from "express";
import {
  checkAuthController,
  getProfileController,
  loginController,
  signupController,
  updateProfileController,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/checkAuth", protectRoute, checkAuthController);
router.get("/profile", protectRoute, getProfileController);
router.put("/profile", protectRoute, updateProfileController);

export default router;
