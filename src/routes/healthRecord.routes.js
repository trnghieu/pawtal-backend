const express = require('express');

const { getHealthRecordByPet, upsertHealthRecord } = require('../controllers/healthRecord.controller');
const { protect } = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

/**
 * @swagger
 * /api/health-records/{petId}:
 *   get:
 *     summary: Lấy hồ sơ sức khỏe theo petId
 *     tags: [Health Records]
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
router.get('/:petId', protect, validateObjectId('petId'), getHealthRecordByPet);

/**
 * @swagger
 * /api/health-records/{petId}:
 *   put:
 *     summary: Tạo hoặc cập nhật hồ sơ sức khỏe
 *     tags: [Health Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bloodType:
 *                 type: string
 *               allergies:
 *                 type: string
 *               chronicDiseases:
 *                 type: string
 *               sterilized:
 *                 type: boolean
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Upsert thành công
 */
router.put('/:petId', protect, validateObjectId('petId'), upsertHealthRecord);

module.exports = router;
