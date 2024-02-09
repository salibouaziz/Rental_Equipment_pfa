import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
} from '../controllers/product.js';
import { protect, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new product (admin access only)
router.post('/', protect,verifyAdmin, createProduct);
// Update a product by ID (admin access only)
router.patch('/:id', protect, verifyAdmin, updateProduct);
// Delete a product by ID (admin access only)
router.delete('/:id', protect, verifyAdmin, deleteProduct);
// Get a specific product by ID
router.get('/:id', getProductById);
// Get all products
router.get('/', getProducts);
router.get('/byCategory/:categoryId', getProductsByCategoryId); // Add this route


export default router;

