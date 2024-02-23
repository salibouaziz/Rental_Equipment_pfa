
import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory, countCategories } from '../controllers/category.js'; // Import countCategories function
import { protect, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new category (admin access only)
router.post('/', protect, verifyAdmin, createCategory);

// Update a category by ID (admin access only)
router.patch("/:id", protect, verifyAdmin, updateCategory);

// Delete a category by ID (admin access only)
router.delete("/:id", protect, verifyAdmin, deleteCategory);

// Count categories (place before the route for getting a category by ID)
router.get('/count', countCategories); // Endpoint to count categories

// Get a specific category by ID (place after the route for counting categories)
router.get("/:id", getCategoryById);

// Get all categories
router.get('/', getCategories);

export default router;
