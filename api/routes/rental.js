import express from 'express';
import {
  createRental, getAllRentals, getRentalById, getAllRentalsByUser , deleteRentalById, updateRental, countRentals,getAllRentalsForAllUsersToday
} from '../controllers/rental.js';
import { protect, verifyAdmin, verifyUserAdmin } from '../utils/verifyToken.js';

const router = express.Router();
router.get('/user', protect, getAllRentalsByUser);
router.post('/:productid', protect, createRental);
// Update a rental by ID
router.patch('/:rentalid', protect,verifyAdmin, updateRental);
// Get a specific rental by ID
//count rental
router.get('/count', countRentals); 
router.get('/:rentalid', getRentalById);
router.delete('/delete/:rentalid', protect,deleteRentalById);
router.get('/count', countRentals); 
// Get all rentals
router.get('/', getAllRentals);
router.get('/today/:productid', protect, getAllRentalsForAllUsersToday);

export default router;

