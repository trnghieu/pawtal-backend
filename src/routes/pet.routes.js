const express = require('express');

const {
  createPet,
  getMyPets,
  getPetById,
  updatePet,
  deletePet,
  getPetDashboard
} = require('../controllers/pet.controller');
const { protect } = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');
const { uploadSingle } = require('../middlewares/upload.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Lấy danh sách thú cưng của tôi
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách thú cưng
 */
router.get('/', protect, getMyPets);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Tạo thú cưng mới, hỗ trợ upload avatar lên Cloudinary
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, type]
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [dog, cat]
 *               breed:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               dob:
 *                 type: string
 *                 format: date-time
 *               weight:
 *                 type: number
 *               color:
 *                 type: string
 *               microchipId:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', protect, uploadSingle('avatar'), createPet);

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 thú cưng
 *     tags: [Pets]
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
 *       404:
 *         description: Không tìm thấy thú cưng
 */
router.get('/:id', protect, validateObjectId('id'), getPetById);

/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     summary: Cập nhật thú cưng, hỗ trợ upload avatar lên Cloudinary
 *     tags: [Pets]
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
 *               type:
 *                 type: string
 *                 enum: [dog, cat]
 *               breed:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               dob:
 *                 type: string
 *                 format: date-time
 *               weight:
 *                 type: number
 *               color:
 *                 type: string
 *               microchipId:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', protect, validateObjectId('id'), uploadSingle('avatar'), updatePet);

/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Xóa thú cưng
 *     tags: [Pets]
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
router.delete('/:id', protect, validateObjectId('id'), deletePet);

/**
 * @swagger
 * /api/pets/{id}/dashboard:
 *   get:
 *     summary: Lấy dữ liệu tổng hợp hồ sơ thú cưng, sức khỏe, tiêm chủng và khám bệnh
 *     tags: [Pets]
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
router.get('/:id/dashboard', protect, validateObjectId('id'), getPetDashboard);

module.exports = router;
