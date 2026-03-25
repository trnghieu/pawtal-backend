const express = require('express');

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/order.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Tạo đơn hàng mới
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, shippingAddress]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, quantity]
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               shippingAddress:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo đơn thành công
 */
router.post('/', protect, createOrder);

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Lấy đơn hàng của tôi
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/my', protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Lấy chi tiết đơn hàng của tôi
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/:id', protect, validateObjectId('id'), getOrderById);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lấy toàn bộ đơn hàng, admin
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', protect, adminOnly, getAllOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Cập nhật trạng thái đơn hàng, admin
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, shipped, completed, cancelled]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.patch('/:id/status', protect, adminOnly, validateObjectId('id'), updateOrderStatus);

module.exports = router;
