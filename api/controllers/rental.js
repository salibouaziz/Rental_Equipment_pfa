import Rental from '../models/Rental.js';
import Product from '../models/Product.js';
import createError from '../utils/error.js';
import User from '../models/User.js';

// CREATE A NEW RENTAL
export const createRental = async (req, res, next) => {
  try {
    const {bookedTimeSlots } = req.body;
    const productId = req.params.productid;
    if(!bookedTimeSlots){
      return next(createError(400, "Please fill in all required fields"));
    };
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    //get the user id
    const user = await User.findById(req.user._id);
    if(!user){
      return next(createError(404, "User Not Found!")); 
    }
    const userId = user._id;
    // Check if the booked time is valid
    const currentDate = new Date();
    const bookedFromDate = new Date(bookedTimeSlots.from);
    const bookedToDate = new Date(bookedTimeSlots.to);
    if (bookedFromDate <= currentDate) {
      return next(createError(400, 'Invalid booking date and time'));
    }
    if (bookedToDate <= bookedFromDate) {
      return next(createError(400, 'Invalid booking date and time'));
    }
    // Check if the booked time slot is available
    const isBooked = await Rental.exists({
      product: productId,
      $or: [
        { 
          'bookedTimeSlots.from': { $lt: bookedTimeSlots.to }, 
          'bookedTimeSlots.to': { $gt: bookedTimeSlots.from } 
        },
        {
          'bookedTimeSlots.from': { $gte: bookedTimeSlots.from, $lt: bookedTimeSlots.to },
        },
        {
          'bookedTimeSlots.to': { $gt: bookedTimeSlots.from, $lte: bookedTimeSlots.to },
        }
      ]
    });
    // If the product quantity is 0 and the slot is already booked, return an error
    if (product.quantityDisponible === 0 && isBooked) {
      return next(createError(400, 'Product is already booked for the specified time'));
    }
    // Calculate total hours
    const totalHours = calculateTotalHours(bookedTimeSlots.from, bookedTimeSlots.to);
    // Calculate total amount based on rental rates
    let totalAmount;
    if (totalHours < 24) {
      totalAmount = totalHours * product.rentPerHour;
    } else {
      const days = Math.ceil(totalHours / 24);
      totalAmount = days * product.rentPerDay;
    }
    // Create a new rental
    const newRental = new Rental({
      product: productId,
      user: userId,
      bookedTimeSlots,
      totalHours,
      totalAmount,
      returned:false,
    });
    // Decrement product quantity only if it's greater than 0
    if (product.quantityDisponible > 0) {
      product.quantityDisponible -= 1;
    }
    // Save changes to product
    await product.save();
    // Save new rental
    await newRental.save();
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
// GET A RENTAL BY ID
export const getRentalById = async (req, res, next) => {
  try {
    const rentalId = req.params.rentalid;
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return next(createError(404, 'Rental not found'));
    }
    res.status(200).json(rental);
  } catch (err) {
    next(err);
  }
};
// GET ALL RENTALS
export const getAllRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find();
    res.status(200).json(rentals);
  } catch (err) {
    next(err);
  }
};
// Update a rental by ID
export const updateRental = async (req, res, next) => {
  try {
    const rentalId = req.params.rentalid;
    const { returned } = req.body;

    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return next(createError(404, 'Rental not found'));
    }

    const previousReturnedStatus = rental.returned;

    // Update the returned status
    rental.returned = returned;
    await rental.save();

    // If the returned status has changed to true, increment quantityDisponible
    if (!previousReturnedStatus && returned) {
      const product = await Product.findById(rental.product);
      if (!product) {
        return next(createError(404, 'Product not found'));
      }
      product.quantityDisponible += 1;
      await product.save();
    }

    res.status(200).json(rental);
  } catch (err) {
    next(err);
  }
};