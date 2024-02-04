import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category.js';
import { protect, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new category (admin access only)
router.post('/', protect, verifyAdmin, createCategory);
//update
router.patch("/:id", protect,verifyAdmin,updateCategory);
//delete
router.delete("/:id", protect,verifyAdmin,deleteCategory);
//get category by id
router.get("/:id",getCategoryById);
// Get all categories
router.get('/', getCategories);

export default router;
