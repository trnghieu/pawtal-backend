const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const createProduct = catchAsync(async (req, res) => {
  const { name, category, price, description, stock, isActive } = req.body;

  if (!name || !category || typeof price === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'name, category and price are required'
    });
  }

  let image = undefined;
  if (req.file) {
    image = await uploadBufferToCloudinary(req.file, 'pawtal/products');
  }

  const product = await Product.create({
    name,
    category,
    price,
    description,
    stock,
    isActive,
    image
  });

  return res.status(201).json({
    success: true,
    message: 'Create product successfully',
    data: product
  });
});

const getProducts = catchAsync(async (req, res) => {
  const query = { isActive: true };

  if (req.query.category) {
    query.category = req.query.category;
  }

  const products = await Product.find(query).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get products successfully',
    data: products
  });
});

const getProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || !product.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Get product successfully',
    data: product
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  const fields = ['name', 'category', 'price', 'description', 'stock', 'isActive'];
  fields.forEach((field) => {
    if (typeof req.body[field] !== 'undefined') {
      product[field] = req.body[field];
    }
  });

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(req.file, 'pawtal/products');
    if (product.image && product.image.publicId) {
      await deleteFromCloudinary(product.image.publicId);
    }
    product.image = uploaded;
  }

  await product.save();

  return res.status(200).json({
    success: true,
    message: 'Update product successfully',
    data: product
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  if (product.image && product.image.publicId) {
    await deleteFromCloudinary(product.image.publicId);
  }

  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Delete product successfully'
  });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
