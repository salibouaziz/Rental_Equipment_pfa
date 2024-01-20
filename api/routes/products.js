import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new product (admin access only)
router.post('/', verifyAdmin, createProduct);
// Update a product by ID (admin access only)
router.put('/:id', verifyAdmin, updateProduct);
// Delete a product by ID (admin access only)
router.delete('/:id', verifyAdmin, deleteProduct);
// Get a specific product by ID
router.get('/:id', getProductById);
// Get all products
router.get('/', getProducts);

export default router;

