const express = require('express');

const {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getAllAppointments,
  updateAppointmentStatus
} = require('../controllers/appointment.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Tạo lịch hẹn dịch vụ
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pet, service, appointmentDate, timeSlot]
 *             properties:
 *               pet:
 *                 type: string
 *               service:
 *                 type: string
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *               timeSlot:
 *                 type: string
 *                 example: 09:00-10:00
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo lịch thành công
 */
router.post('/', protect, createAppointment);

/**
 * @swagger
 * /api/appointments/my:
 *   get:
 *     summary: Lấy lịch hẹn của tôi
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/my', protect, getMyAppointments);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 lịch hẹn của tôi
 *     tags: [Appointments]
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
router.get('/:id', protect, validateObjectId('id'), getAppointmentById);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Cập nhật lịch hẹn của tôi
 *     tags: [Appointments]
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
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *               timeSlot:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', protect, validateObjectId('id'), updateAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Hủy lịch hẹn của tôi
 *     tags: [Appointments]
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
 *         description: Hủy thành công
 */
router.delete('/:id', protect, validateObjectId('id'), cancelAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Lấy tất cả lịch hẹn, admin
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', protect, adminOnly, getAllAppointments);

/**
 * @swagger
 * /api/appointments/{id}/status:
 *   patch:
 *     summary: Cập nhật trạng thái lịch hẹn, admin
 *     tags: [Appointments]
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
 *                 enum: [booked, confirmed, done, cancelled]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.patch('/:id/status', protect, adminOnly, validateObjectId('id'), updateAppointmentStatus);

module.exports = router;
