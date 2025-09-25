/*const Product = require("../Model/productModel");

// Add new product (must belong to a category)
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products (populate category name)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID (with category populated)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Product not found" });
  }
};

// Update product (change name, price, or category)
const updateProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};*/























/*const Product = require("../Model/productModel");

// Add new product
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      thumbnail,
      images,
      discountPercentage,
      rating,
      stock,
      brand
    } = req.body;

    const product = new Product({
      title,
      description,
      price,
      category,
      thumbnail,
      images: Array.isArray(images) ? images : (images ? images.split(',').map(img => img.trim()) : []),
      discountPercentage: discountPercentage || 0,
      rating: rating || 0,
      stock: stock || 0,
      brand: brand || ''
    });

    await product.save();
    
    // Populate category name before sending response
    await product.populate("category", "name");
    
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Get all products (populate category name)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Get product by ID (with category populated)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    res.json({
      success: true,
      product
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Product not found" 
    });
  }
};

// Update product with all fields
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      thumbnail,
      images,
      discountPercentage,
      rating,
      stock,
      brand
    } = req.body;

    const updateData = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price }),
      ...(category !== undefined && { category }),
      ...(thumbnail !== undefined && { thumbnail }),
      ...(images !== undefined && { 
        images: Array.isArray(images) ? images : (images ? images.split(',').map(img => img.trim()) : [])
      }),
      ...(discountPercentage !== undefined && { discountPercentage }),
      ...(rating !== undefined && { rating }),
      ...(stock !== undefined && { stock }),
      ...(brand !== undefined && { brand })
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate("category", "name");

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    res.json({ 
      success: true,
      message: "Product deleted successfully" 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};*/




































const Product = require("../Model/productModel");
const Category = require("../Model/categoryModel"); // تأكد من وجود هذا الموديل واستيراده

// Add new product
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      thumbnail,
      images,
      discountPercentage,
      rating,
      stock,
      brand
    } = req.body;

    const product = new Product({
      title,
      description,
      price,
      category,
      thumbnail,
      images: Array.isArray(images) ? images : (images ? images.split(',').map(img => img.trim()) : []),
      discountPercentage: discountPercentage || 0,
      rating: rating || 0,
      stock: stock || 0,
      brand: brand || ''
    });

    await product.save();

    // أضف المنتج لمصفوفة products بالفئة
    if (category) {
      await Category.findByIdAndUpdate(
        category,
        { $addToSet: { products: product._id } }
      );
    }
    
    // Populate category name before sending response
    await product.populate("category", "name");
    
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Get all products (populate category name)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Get product by ID (with category populated)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    res.json({
      success: true,
      product
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Product not found" 
    });
  }
};

// Update product with all fields
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      thumbnail,
      images,
      discountPercentage,
      rating,
      stock,
      brand
    } = req.body;

    const updateData = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price }),
      ...(category !== undefined && { category }),
      ...(thumbnail !== undefined && { thumbnail }),
      ...(images !== undefined && { 
        images: Array.isArray(images) ? images : (images ? images.split(',').map(img => img.trim()) : [])
      }),
      ...(discountPercentage !== undefined && { discountPercentage }),
      ...(rating !== undefined && { rating }),
      ...(stock !== undefined && { stock }),
      ...(brand !== undefined && { brand })
    };

    // جلب المنتج القديم لمعرفة فئته القديمة
    const oldProduct = await Product.findById(req.params.id);
    if (!oldProduct) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    const oldCategoryId = oldProduct.category ? oldProduct.category.toString() : null;
    const newCategoryId = category ? category.toString() : null;

    // تحديث المنتج
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate("category", "name");

    // إذا تغيرت الفئة: احذف من القديمة وأضف للجديدة
    if (newCategoryId && oldCategoryId && oldCategoryId !== newCategoryId) {
      await Category.findByIdAndUpdate(oldCategoryId, { $pull: { products: product._id } });
      await Category.findByIdAndUpdate(newCategoryId, { $addToSet: { products: product._id } });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    // احضر المنتج لمعرفة الفئة
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    // احذف المنتج من الفئة
    if (product.category) {
      await Category.findByIdAndUpdate(product.category, { $pull: { products: product._id } });
    }
    res.json({ 
      success: true,
      message: "Product deleted successfully" 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};