import express from 'express';
import {
  createRental
} from '../controllers/rental.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:id', verifyUser, createRental);

export default router;

