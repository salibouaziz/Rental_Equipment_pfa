import Category from '../models/Category.js';
import createError from '../utils/error.js';

// Create a new category
export const createCategory = async (req, res, next) => {
  try {

    const { name, image  } = req.body;


    
    const newCategory = new Category({
      name,
      image,



      

    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};
// Update a category by ID
export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
};
// Get a specific category by ID
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(createError(404, 'Category not found'));
    }
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
