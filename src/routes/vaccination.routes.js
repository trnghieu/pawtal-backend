const express = require('express');

const {
  createVaccination,
  getVaccinationsByPet,
  getVaccinationById,
  updateVaccination,
  deleteVaccination
} = require('../controllers/vaccination.controller');
const { protect } = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

/**
 * @swagger
 * /api/vaccinations:
 *   post:
 *     summary: Tạo lịch tiêm chủng mới
 *     tags: [Vaccinations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pet, vaccineName, date]
 *             properties:
 *               pet:
 *                 type: string
 *               vaccineName:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               nextDueDate:
 *                 type: string
 *                 format: date-time
 *               provider:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [done, pending]
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', protect, createVaccination);

/**
 * @swagger
 * /api/vaccinations/pet/{petId}:
 *   get:
 *     summary: Lấy danh sách tiêm chủng của một thú cưng
 *     tags: [Vaccinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/pet/:petId', protect, validateObjectId('petId'), getVaccinationsByPet);

/**
 * @swagger
 * /api/vaccinations/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 bản ghi tiêm chủng
 *     tags: [Vaccinations]
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
router.get('/:id', protect, validateObjectId('id'), getVaccinationById);

/**
 * @swagger
 * /api/vaccinations/{id}:
 *   put:
 *     summary: Cập nhật bản ghi tiêm chủng
 *     tags: [Vaccinations]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vaccineName:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               nextDueDate:
 *                 type: string
 *                 format: date-time
 *               provider:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [done, pending]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', protect, validateObjectId('id'), updateVaccination);

/**
 * @swagger
 * /api/vaccinations/{id}:
 *   delete:
 *     summary: Xóa bản ghi tiêm chủng
 *     tags: [Vaccinations]
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
router.delete('/:id', protect, validateObjectId('id'), deleteVaccination);

module.exports = router;
