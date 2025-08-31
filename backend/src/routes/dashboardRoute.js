import express from "express";
import { getMonthlyDashboard } from "../controllers/dashboardController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, getMonthlyDashboard);

export default router;
