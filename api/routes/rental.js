import express from 'express';
import {
  createRental, getAllRentals, getRentalById, getAllRentalsByUser , deleteRentalById, updateRental, countRentals,getAllRentalsForAllUsersToday,countRentalsLast6Days
} from '../controllers/rental.js';
import { protect, verifyAdmin, verifyUserAdmin } from '../utils/verifyToken.js';

const router = express.Router();
router.get('/count', countRentals); 
// Route to count rentals for the last 6 days
router.get('/count-rentals-last-6-days', countRentalsLast6Days);

// Other routes
router.get('/user', protect, getAllRentalsByUser);
router.post('/:productid', protect, createRental);
router.patch('/:rentalid', protect,verifyAdmin, updateRental);
router.get('/:rentalid', getRentalById);
router.delete('/delete/:rentalid', protect,deleteRentalById);

router.get('/', getAllRentals);
router.get('/today/:productid', protect, getAllRentalsForAllUsersToday);
router.get('/count', countRentals); 

export default router;
