import express from 'express';
import {
<<<<<<< HEAD
  createRental, getAllRentals, getRentalById, getAllRentalsByUser , deleteRentalById
=======
  createRental, getAllRentals, getRentalById, updateRental
>>>>>>> c81a7bcb2de564fc82f927d74c07111d20608759
} from '../controllers/rental.js';
import { protect, verifyAdmin, verifyUserAdmin } from '../utils/verifyToken.js';

const router = express.Router();
router.get('/user', protect, getAllRentalsByUser);
router.post('/:productid', protect, createRental);
// Update a rental by ID
router.patch('/:rentalid', protect,verifyAdmin, updateRental);
// Get a specific rental by ID
router.get('/:rentalid', getRentalById);
router.delete('/delete/:rentalid', deleteRentalById);
// Get all rentals
router.get('/', getAllRentals);

export default router;

