import express from 'express';
import { checkAuthController, loginController, signupController } from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/checkAuth", protectRoute, checkAuthController);

export default router