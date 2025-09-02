import express from "express";
import { adminOnly, protectRoute } from "../middleware/authMiddleware.js";
import {
  addStock,
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
router.put("/add-stock/:id", protectRoute, addStock);
router.delete("/:id", protectRoute, adminOnly, deleteProduct);

export default router;
