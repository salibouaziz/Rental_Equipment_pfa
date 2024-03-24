import Rental from '../models/Rental.js';
import Product from '../models/Product.js';
import createError from '../utils/error.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../models/Notification.js';
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
    const transactionId = uuidv4();
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
    const existingRentalsForDate = await Rental.find({
      product: productId,
      'bookedTimeSlots.from': { $lt: bookedTimeSlots.to },
      'bookedTimeSlots.to': { $gt: bookedTimeSlots.from }
    });
    
    // Check if the number of existing rentals exceeds the allowed limit (quantityTotal)
    if (existingRentalsForDate.length >= product.quantityDisponible) {
      return next(createError(400, 'Product is fully booked for the specified date'));
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
      rented:false,
      transactionId: transactionId
    });
    // Save changes to product
    await product.save();
    // Save new rental
    await newRental.save();
    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      return next(createError(404, 'Admin user not found'));
    }
    const creationDate = new Date(newRental.createdAt).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      hour12: true,
    });
    const newNotification = new Notification({
      rental: newRental._id,
      user: adminUser._id , // Assuming the admin's user ID is stored in req.user
      product: productId,
      message:`Client ${user.username} has rented the product ${product.Title} on ${creationDate}`,
    });
    await newNotification.save();
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

export const getAllRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find().populate({
      path: 'product',
      model: 'Product',
    }).populate({
      path: 'user',
      model: 'User',
    });
    
    res.status(200).json(rentals);
  } catch (err) {
    next(err);
  }
};


export const getAllRentalsByUser = async (req, res, next) => {
  try {
    const userId = req.user._id; // Get the user ID from the request

    const userRentals = await Rental.find({ user: userId }).populate('product'); // Populate 'product' to get product details

    res.status(200).json(userRentals);
  } catch (err) {
    next(err);
  }
};
// DELETE A RENTAL BY ID
export const deleteRentalById = async (req, res, next) => {
  try {
    const rentalId = req.params.rentalid;

    // Find the rental by ID
    const rental = await Rental.findById(rentalId).populate('user').populate('product');;
    
    if (!rental) {
      return next(createError(404, 'Rental not found'));
    }
    // Delete the rental
    await Rental.findByIdAndDelete(rentalId);
    // Check if the user is not an admin and send notification
    if (!req.user.isAdmin) {
      // Format the deletion date
      const deletionDate = new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        hour12: true,
      });

      // Create a notification for the admin
      const adminUser = await User.findOne({ isAdmin: true });

      if (!adminUser) {
        return next(createError(404, 'Admin user not found'));
      }

      const newNotification = new Notification({
        rental: rental._id,
        user: adminUser._id,
        product: rental.product._id,
        message: `Client ${rental.user.username} has deleted the rental of the product ${rental.product.Title} on ${deletionDate}`,
      });

      await newNotification.save();
    }
    res.status(200).json({ message: 'Rental deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const updateRental = async (req, res, next) => {
  try {
    const rentalId = req.params.rentalid;
    const { returned, rented } = req.body;

    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return next(createError(404, 'Rental not found'));
    }
    const previousReturnedStatus = rental.returned;
    const previousRentedStatus = rental.rented;

    // Update the returned status
    rental.returned = returned;
    rental.rented = rented;
    await rental.save();

    // If the returned status has changed to true, increment quantityDisponible
    if (!previousReturnedStatus && returned) {
      const product = await Product.findById(rental.product);
      if (!product) {
        return next(createError(404, 'Product not found'));
      }
      product.currentQuantity += 1;
    
      await product.save();
    }
    if (!previousRentedStatus && rented) {
      const product = await Product.findById(rental.product);
      if (!product) {
        return next(createError(404, 'Product not found'));
      }
      
      product.currentQuantity -= 1;

    
      await product.save();
    }

    res.status(200).json(rental);
  } catch (err) {
    next(err);
  }
};
// Count rentals
export const countRentals = async (req, res, next) => {
  try {
    const count = await Rental.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

export const getAllRentalsForAllUsersToday = async (req, res, next) => {
  try {
    const productId = req.params.productid; // Extract product ID from the request parameters

    // Get today's date in the format "2024-02-26T00:00:00+01:00"
    const currentDate = new Date().toISOString().split('T')[0];

    // Find all rentals for the specified product with today's date within booked time slots
    const allRentalsToday = await Rental.find({
      product: productId,
      $or: [
        {
          'bookedTimeSlots.from': { $lte: currentDate },
          'bookedTimeSlots.to': { $gte: currentDate }
        },
        {
          'bookedTimeSlots.from': { $gte: currentDate, $lt: new Date(new Date(currentDate).getTime() + 24 * 60 * 60 * 1000).toISOString() },
        },
        {
          'bookedTimeSlots.to': currentDate
        }
      ],
      returned: false
    }).populate('user').populate('product');

    // Organize the rentals by user
    const rentalsByUser = {};

    allRentalsToday.forEach((rental) => {
      const userId = rental.user._id.toString();

      // If the user is not in the rentalsByUser object, initialize it
      if (!rentalsByUser[userId]) {
        rentalsByUser[userId] = [];
      }

      // Add the rental to the corresponding user
      rentalsByUser[userId].push(rental);
    });

    res.status(200).json(rentalsByUser);
  } catch (err) {
    next(err);
  }
};
// Count rentals for the last 6 days
export const countRentalsLast6Days = async (req, res, next) => {
  try {
    const counts = {};
    const today = new Date();

    // Loop through the last 6 days
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Find rentals for the current date
      const count = await Rental.countDocuments({
        createdAt: {
          $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()), // Start of the day
          $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) // End of the day
        }
      });

      // Store the count for the current date
      counts[date.toLocaleDateString('en-US')] = count;
    }

    res.status(200).json(counts);
  } catch (err) {
    next(err);
  }
};
