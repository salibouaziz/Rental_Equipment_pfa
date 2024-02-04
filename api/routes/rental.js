import express from 'express';
import {
  createRental
} from '../controllers/rental.js';
import { protect, verifyAdmin, verifyUserAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', protect, createRental);
//router.patch('/:rentalid', protect,verifyAdmin, updateRental);


export default router;

