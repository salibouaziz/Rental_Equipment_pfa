// Import necessary models and libraries
import Rental from '../models/Rental.js';
import Product from '../models/Product.js';
import createError from '../utils/error.js';

// Create a new rental
export const createRental = async (req, res, next) => {
  try {
    const { product: productId, bookedTimeSlots} = req.body;
    const { id: userId } = req.params; // Extract user ID from request parameters
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(createError(404, 'Product not found'));
    }

    // Check if the quantity is sufficient
    if (product.quantity <= 0 || !product.isAvailable) {
      return next(createError(400, 'Product not available for rental'));
    }

    // Check if the booked time is valid
    const currentDate = new Date();
    const bookedFromDate = new Date(bookedTimeSlots.from);
    if (bookedFromDate <= currentDate) {
      return next(createError(400, 'Invalid booking date and time'));
    }
    // Calculate total hours
    const totalHours = calculateTotalHours(bookedTimeSlots.from, bookedTimeSlots.to);

    // Calculate total amount
    const totalAmount = totalHours * product.rentPerHour;

    // Create a new rental
    const newRental = new Rental({
      product: productId,
      user: userId,
      bookedTimeSlots,
      totalHours,
      totalAmount,
    });

    await newRental.save();

    // Update product quantity and availability
    product.quantity -= 1;
    if (product.quantity === 0) {
      product.isAvailable = false;
    }

    await product.save();

    res.status(201).json(newRental);
  } catch (err) {
    next(err);
  }
};

// Helper function to calculate total hours
const calculateTotalHours = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const timeDiff = toDate - fromDate;
  return timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours
};
