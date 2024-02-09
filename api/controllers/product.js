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
      categoryName, // Adjusted to categoryName
      image,
      quantity,
      rentPerHour,
      rentPerDay,
    } = req.body;
    // Check if the specified category exists
    const existingCategory = await Category.findOne({name:categoryName});
    if (!existingCategory) {
      return next(createError(404, 'Category not found'));
    }
    if(!Title ||!description ||!categoryName ||!quantity ||!rentPerHour ||!rentPerDay){
      return next(createError(400, 'please fill in all fields'));
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
    });

    await newProduct.save();
    // Update the associated category with the new product ID
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
     // Check if the 'category' field exists in the update data
     if ('category' in req.body) {
      return next(createError(400, "Cannot update the 'category' field"));
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      return next(createError(404, 'Product not found'));
    }
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
    // Remove product ID from the associated category
    const associatedCategory = await Category.findById(deletedProduct.category);
    if (associatedCategory) {
      associatedCategory.products.pull(req.params.id); // Remove the product ID
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
  }};
  export const getProductsByCategoryId = async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
  
      // Find products that belong to the specified category
      const products = await Product.find({ category: categoryId });
  
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
};