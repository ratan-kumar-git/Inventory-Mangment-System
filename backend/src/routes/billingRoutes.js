import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createBill, getBill, getBillById } from "../controllers/billingController.js";

const router = express.Router();

router.post("/", protectRoute, createBill);
router.get("/", protectRoute, getBill);
router.get("/:id", protectRoute, getBillById);


export default router;
