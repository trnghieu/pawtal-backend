const express = require('express');

const {
  createMedicalVisit,
  getMedicalVisitsByPet,
  getMedicalVisitById,
  updateMedicalVisit,
  deleteMedicalVisit
} = require('../controllers/medicalVisit.controller');
const { protect } = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

/**
 * @swagger
 * /api/medical-visits:
 *   post:
 *     summary: Tạo nhật ký thăm khám mới
 *     tags: [Medical Visits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pet, visitDate]
 *             properties:
 *               pet:
 *                 type: string
 *               visitDate:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               clinic:
 *                 type: string
 *               vetName:
 *                 type: string
 *               nextVisitDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', protect, createMedicalVisit);

/**
 * @swagger
 * /api/medical-visits/pet/{petId}:
 *   get:
 *     summary: Lấy danh sách thăm khám theo petId
 *     tags: [Medical Visits]
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
router.get('/pet/:petId', protect, validateObjectId('petId'), getMedicalVisitsByPet);

/**
 * @swagger
 * /api/medical-visits/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 lần khám
 *     tags: [Medical Visits]
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
router.get('/:id', protect, validateObjectId('id'), getMedicalVisitById);

/**
 * @swagger
 * /api/medical-visits/{id}:
 *   put:
 *     summary: Cập nhật lần khám
 *     tags: [Medical Visits]
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
 *               visitDate:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               clinic:
 *                 type: string
 *               vetName:
 *                 type: string
 *               nextVisitDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', protect, validateObjectId('id'), updateMedicalVisit);

/**
 * @swagger
 * /api/medical-visits/{id}:
 *   delete:
 *     summary: Xóa lần khám
 *     tags: [Medical Visits]
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
router.delete('/:id', protect, validateObjectId('id'), deleteMedicalVisit);

module.exports = router;
