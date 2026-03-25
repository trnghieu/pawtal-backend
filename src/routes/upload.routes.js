const express = require('express');

const { uploadImage } = require('../controllers/upload.controller');
const { protect } = require('../middlewares/auth.middleware');
const { uploadSingle } = require('../middlewares/upload.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/uploads/image:
 *   post:
 *     summary: Upload 1 ảnh bất kỳ lên Cloudinary
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               folder:
 *                 type: string
 *                 example: pawtal/pets
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload thành công
 */
router.post('/image', protect, uploadSingle('image'), uploadImage);

module.exports = router;
