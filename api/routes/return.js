import express from 'express';
import { returnProduct } from '../controllers/return.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();
// Return a rented product
router.post('/:id', verifyAdmin ,returnProduct);

export default router;
