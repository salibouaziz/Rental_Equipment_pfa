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
      quantityTotal,
      rentPerHour,
      rentPerDay,
    } = req.body;
    
    const existingCategory = await Category.findOne({ name: categoryName });
    if (!existingCategory) {
      return next(createError(404, 'Category not found'));
    }
    if (!Title || !description || !categoryName || !quantityTotal || !rentPerHour || !rentPerDay ) {
      return next(createError(400, 'Please fill in all fields '));
    }
    const quantityDisponible = quantityTotal;
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
    // Update other fields except quantityTotal and quantityPanne
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...updatedFields,
        quantityPanne: newQuantityPanne,
        quantityTotal: newQuantityTotal,
        quantityDisponible: newQuantityDisponible,
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
