import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new category (admin access only)
router.post('/', verifyAdmin, createCategory);
//update
router.put("/:id",verifyAdmin,updateCategory);
//delete
router.delete("/:id",verifyAdmin,deleteCategory);
//get category by id
router.get("/:id",getCategoryById);
// Get all categories
router.get('/', getCategories);

export default router;
