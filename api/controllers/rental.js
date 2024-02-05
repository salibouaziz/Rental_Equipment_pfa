import Rental from '../models/Rental.js';
import Product from '../models/Product.js';
import createError from '../utils/error.js';

export const createRental = async (req, res, next) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return next(createError(400, "Please provide valid product information"));
    }

    const userId = req.user._id;

    const rentalProducts = [];

    for (const product of products) {
      const { productId, bookedTimeSlots } = product;

      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return next(createError(404, `Product with ID ${productId} not found`));
      }

      // Check if the booked time is valid
      const currentDate = new Date();
      const bookedFromDate = new Date(bookedTimeSlots.from);
      const bookedToDate = new Date(bookedTimeSlots.to);
      if (bookedFromDate <= currentDate || bookedFromDate >= bookedToDate) {
        return next(createError(400, 'Invalid booking date and time'));
      }

      // Check if the product is already booked for the specified time
      if (existingProduct.quantity > 0) {
        const isBooked = await Rental.exists({
          'products': {
            $elemMatch: {
              'product': productId,
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
            }
          }
        });

        if (isBooked) {
          return next(createError(400, `Product with ID ${productId} is already booked for the specified time`));
        }
      }
      const totalHours = calculateTotalHours(bookedFromDate, bookedToDate);
      let totalAmount;
      if (totalHours <= 24) {
        totalAmount = totalHours * existingProduct.rentPerHour;
      } else {
        const days = Math.ceil(totalHours / 24);
        totalAmount = days * existingProduct.rentPerDay;
      }

      rentalProducts.push({
        productId,
        bookedTimeSlots,
        totalHours,
        totalAmount,
        returned: false
      });
      if(existingProduct.quantity>0){
        existingProduct.quantity--; // Decrement product quantity
      }
      await existingProduct.save();
    }

    const newRental = new Rental({
      products: rentalProducts,
      user: userId
    });

    await newRental.save();

    res.status(201).json(newRental);
  } catch (err) {
    next(err);
  }
};

const calculateTotalHours = (from, to) => {
  const timeDiff = to - from;
  return timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours
};
