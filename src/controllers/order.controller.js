const Product = require('../models/Product');
const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');

const createOrder = catchAsync(async (req, res) => {
  const { items, shippingAddress, note } = req.body;

  if (!Array.isArray(items) || items.length === 0 || !shippingAddress) {
    return res.status(400).json({
      success: false,
      message: 'items and shippingAddress are required'
    });
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of items) {
    const product = await Product.findById(item.productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: `Product not found: ${item.productId}`
      });
    }

    const quantity = Number(item.quantity || 0);
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'quantity must be greater than 0'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${product.name}`
      });
    }

    const subtotal = product.price * quantity;

    orderItems.push({
      product: product._id,
      quantity,
      price: product.price,
      subtotal
    });

    totalAmount += subtotal;
    product.stock -= quantity;
    await product.save();
  }

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount,
    shippingAddress,
    note
  });

  const populatedOrder = await Order.findById(order._id)
    .populate('user', 'name email')
    .populate('items.product', 'name category price image');

  return res.status(201).json({
    success: true,
    message: 'Create order successfully',
    data: populatedOrder
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('items.product', 'name category price image')
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get orders successfully',
    data: orders
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
    .populate('items.product', 'name category price image');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Get order successfully',
    data: order
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email phone')
    .populate('items.product', 'name category price image')
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get all orders successfully',
    data: orders
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];

  if (!allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    });
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate('user', 'name email');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Update order status successfully',
    data: order
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};
