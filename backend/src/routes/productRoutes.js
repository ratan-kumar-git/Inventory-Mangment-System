import express from "express";
import { adminOnly, protectRoute } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";


const router = express.Router();

router.post("/", protectRoute, adminOnly, createProduct);
router.get("/", protectRoute, getProducts);
router.get("/:id", protectRoute, getProductById);
router.put("/:id", protectRoute, updateProduct);
router.put("/delete/:id", protectRoute, adminOnly, deleteProduct);

export default router;
