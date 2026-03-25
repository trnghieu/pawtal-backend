const express = require('express');

const { getMe, updateMe } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { uploadSingle } = require('../middlewares/upload.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Lấy thông tin chủ nuôi hiện tại
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/me', protect, getMe);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Cập nhật thông tin chủ nuôi, hỗ trợ upload avatar lên Cloudinary
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/me', protect, uploadSingle('avatar'), updateMe);

module.exports = router;
