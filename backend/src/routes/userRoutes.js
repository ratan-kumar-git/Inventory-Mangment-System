import express from 'express';
import { createUser, deleteUser, getUser, getUserById, updateUser } from '../controllers/userController.js';
import { adminOnly, protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/", protectRoute, adminOnly, createUser);
router.get("/", protectRoute, adminOnly, getUser);
router.get("/:id", protectRoute, adminOnly, getUserById);
router.put("/:id", protectRoute, updateUser)
router.delete("/:id", protectRoute, adminOnly, deleteUser)

export default router