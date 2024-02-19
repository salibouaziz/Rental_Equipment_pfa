import Product from '../models/Product.js';
import Category from '../models/Category.js';
import createError from '../utils/error.js';

// Create a new product
export const createProduct = async (req, res, next) => {
  console.log('Request Body:', req.body);
  try {
    const {
      Title,
      description,
      categoryName,
      image,
      quantity,
      rentPerHour,
      rentPerDay,
      status // Add status to destructuring
    } = req.body;
    
    const existingCategory = await Category.findOne({ name: categoryName });
    if (!existingCategory) {
      return next(createError(404, 'Category not found'));
    }
    if (!Title || !description || !categoryName || !quantity || !rentPerHour || !rentPerDay || !status) {
      return next(createError(400, 'Please fill in all fields including status'));
    }

    const newProduct = new Product({
      Title,
      description,
      categoryName,
      category: existingCategory._id,
      image,
      quantity,
      rentPerHour,
      rentPerDay,
      status // Assign status
    });

    await newProduct.save();
    existingCategory.products.push(newProduct._id);
    await existingCategory.save();
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// Update a product by ID
export const updateProduct = async (req, res, next) => {
  try {
    // Prevent updating certain fields like 'category'
    const { category, ...updatedFields } = req.body; // Destructure 'category' field from req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields }, // Use destructured 'updatedFields' instead of 'req.body'
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    // Handle errors
    next(err);
  }
};


// Delete a product by ID
export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const associatedCategory = await Category.findById(deletedProduct.category);
    if (associatedCategory) {
      associatedCategory.products.pull(req.params.id);
      await associatedCategory.save();
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Get a specific product by ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort("-createdAt");
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Get products by category ID
export const getProductsByCategoryId = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
