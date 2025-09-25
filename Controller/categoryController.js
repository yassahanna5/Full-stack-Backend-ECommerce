/*const Category = require("../Model/categoryModel");

// Add new category
const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all categories and products existed in categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
};*/





























const Category = require("../Model/categoryModel");

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ 
      $or: [{ name }, { slug }] 
    });
    
    if (existingCategory) {
      return res.status(400).json({ 
        success: false,
        message: "Category with this name or slug already exists" 
      });
    }

    const category = new Category({ name, slug });
    await category.save();
    
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).populate("products");
    res.json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products"); ;
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }
    res.json({
      success: true,
      category
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Category not found" 
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    // Check if another category exists with the same name or slug
    const existingCategory = await Category.findOne({ 
      $and: [
        { _id: { $ne: req.params.id } }, // Exclude current category
        { $or: [{ name }, { slug }] }
      ]
    });
    
    if (existingCategory) {
      return res.status(400).json({ 
        success: false,
        message: "Another category with this name or slug already exists" 
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }

    res.json({
      success: true,
      message: "Category updated successfully",
      category
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }
    res.json({ 
      success: true,
      message: "Category deleted successfully" 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
