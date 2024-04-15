import Product from '../models/Product.js';
import Category from '../models/Category.js';
import createError from '../utils/error.js';
import Rental from '../models/Rental.js';
// Create a new product
export const createProduct = async (req, res, next) => {
  console.log('Request Body:', req.body);
  try {
    const {
      Title,
      description,
      categoryName,
      image,
      quantityTotal,
      rentPerHour,
      rentPerDay,
    } = req.body;
    
    // Check if a product with the same title already exists
    const existingProduct = await Product.findOne({ Title });
    if (existingProduct) {
      return next(createError(400, 'Product with title already exists'));
    }

    const existingCategory = await Category.findOne({ name: categoryName });
    if (!existingCategory) {
      return next(createError(404, 'Category not found'));
    }
    if (!Title || !description || !categoryName || !quantityTotal || !rentPerHour || !rentPerDay ) {
      return next(createError(400, 'Please fill in all fields '));
    }
    const quantityDisponible = quantityTotal;
    const currentQuantity = quantityTotal;
    const quantityPanne = 0;
    const newProduct = new Product({
      Title,
      description,
      categoryName,
      category: existingCategory._id,
      image,
      quantityTotal,
      quantityDisponible,
      quantityPanne,
      currentQuantity,
      rentPerHour,
      rentPerDay,
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
    const { category, quantityPanne: newQuantityPanne, quantityTotal: newQuantityTotal, ...updatedFields } = req.body;
    const productId = req.params.id;

    // Fetch the existing product
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate the difference between old and new quantityPanne
    const oldQuantityPanne = existingProduct.quantityPanne || 0;
    const differenceQuantityPanne = newQuantityPanne - oldQuantityPanne;

    // Calculate the difference between old and new quantityTotal
    const oldQuantityTotal = existingProduct.quantityTotal || 0;
    const differenceQuantityTotal = newQuantityTotal - oldQuantityTotal;

    // Calculate the new quantityDisponible
    let newQuantityDisponible = existingProduct.quantityDisponible || 0;
    if (!isNaN(differenceQuantityTotal)) {
      newQuantityDisponible += differenceQuantityTotal;
    }
    if (!isNaN(differenceQuantityPanne)) {
      newQuantityDisponible -= differenceQuantityPanne;
    }
     // Calculate the new currentQuantity
     let newCurrentQuantity = existingProduct.currentQuantity || 0;
     if (!isNaN(differenceQuantityTotal)) {
       newCurrentQuantity += differenceQuantityTotal;
     }
     if (!isNaN(differenceQuantityPanne)) {
       newCurrentQuantity -= differenceQuantityPanne;
     }
     
    // Update other fields except quantityTotal and quantityPanne
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...updatedFields,
        quantityPanne: newQuantityPanne,
        quantityTotal: newQuantityTotal,
        quantityDisponible: newQuantityDisponible,
        currentQuantity: newCurrentQuantity,
        category
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
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
// Count products
export const countProducts = async (req, res, next) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};
export const searchProductsByName = async (req, res, next) => {
  try {
    const { query } = req.params;
    if (!query) {
      return res.status(400).json({ error: 'Please provide at least two letters for the search query' });
    }

    // Search for products whose titles or category names contain the input string (case-insensitive)
    const regex = new RegExp(query, 'i');
    const products = await Product.find({
      $or: [
        { Title: { $regex: regex } }, // Search by product title
        { categoryName: { $regex: regex } } // Search by category name
      ]
    });

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};








export const getRentalCountsForProducts = async (req, res, next) => {
  try {
    // Find products with rentalCount different from 0
    const products = await Product.find({ rentalCount: { $ne: 0 } });

    // Create an object to store rental counts for each product
    const rentalCounts = {};

    // Iterate over each product
    for (const product of products) {
      // Find rentals for the current product
      const rentals = await Rental.find({ product: product._id });

      // Count the number of rentals for the current product
      const rentalCount = rentals.length;

      // Add the rental count to the rentalCounts object
      rentalCounts[product._id] = rentalCount;
    }

    // Filter out products with rental count 0
    const filteredProducts = products.filter(product => rentalCounts[product._id] !== 0);

    // Sort filtered products by rental count in descending order
    filteredProducts.sort((a, b) => rentalCounts[b._id] - rentalCounts[a._id]);

    // Attach the rental counts to each product object
    const productsWithRentalCounts = filteredProducts.map(product => ({
      ...product.toObject(),
      rentalCount: rentalCounts[product._id] || 0
    }));

    res.status(200).json(productsWithRentalCounts);
  } catch (err) {
    next(err);
  }
};