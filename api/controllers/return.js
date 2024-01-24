import Rental from '../models/Rental.js';
import Product from '../models/Product.js';
import createError from '../utils/error.js';

export const returnProduct = async (req, res, next) => {
  try {
    const { id: rentalId } = req.params;

    // Find the rental by ID
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return next(createError(404, 'Rental not found'));
    }
    // Check if the product associated with the rental exists
    const product = await Product.findById(rental.product);
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    // Check if the date of the rental has passed
    const currentDate = new Date();
    const bookedToDate = new Date(rental.bookedTimeSlots.to);

    if (currentDate < bookedToDate) {
      return next(createError(400, 'Cannot update return status before the rental period ends'));
    }
    // Update return status in the rental entry
     rental.returned =true;
    // Update product quantity and availability only if the product is returned
    if (rental.returned) {
      product.quantity += 1;
      if (product.quantity > 0) {
        product.isAvailable = true;
      }
      await product.save();
    }
    // Save the updated rental entry
    await rental.save();
    res.status(200).json({ message: 'Product return status updated successfully' });
  } catch (err) {
    next(err);
  }
};
