import express from 'express';
import {
  createRental, getAllRentals, getRentalById, updateRental
} from '../controllers/rental.js';
import { protect, verifyAdmin, verifyUserAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:productid', protect, createRental);
// Update a rental by ID
router.patch('/:rentalid', protect,verifyAdmin, updateRental);
// Get a specific rental by ID
router.get('/:rentalid', getRentalById);
// Get all rentals
router.get('/', getAllRentals);

export default router;

