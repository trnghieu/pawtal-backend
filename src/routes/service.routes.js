const express = require('express');

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/service.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');
const { uploadSingle } = require('../middlewares/upload.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Lấy danh sách dịch vụ công khai
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', getServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 dịch vụ
 *     tags: [Services]
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
router.get('/:id', validateObjectId('id'), getServiceById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Tạo dịch vụ mới, admin và hỗ trợ upload ảnh Cloudinary
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, price, duration]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', protect, adminOnly, uploadSingle('image'), createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Cập nhật dịch vụ, admin và hỗ trợ upload ảnh Cloudinary
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', protect, adminOnly, validateObjectId('id'), uploadSingle('image'), updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Xóa dịch vụ, admin
 *     tags: [Services]
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
 *         description: Xóa thành công
 */
router.delete('/:id', protect, adminOnly, validateObjectId('id'), deleteService);

module.exports = router;
