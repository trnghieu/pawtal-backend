const express = require('express');

const {
  createPet,
  getMyPets,
  getPetById,
  updatePet,
  deletePet,
  getPetDashboard,
  uploadPetImage,
  getPublicPetProfile,
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
 *   put:
 *     summary: upload avatar lên Cloudinary
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
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', protect, validateObjectId('id'), uploadSingle('avatar'), uploadPetImage);

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
/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet APIs
 */

/**
 * @swagger
 * /api/pets/public/{publicCode}:
 *   get:
 *     summary: Get public pet information by QR code
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: publicCode
 *         required: true
 *         schema:
 *           type: string
 *         example: pet_ab12cd34ef
 *     responses:
 *       200:
 *         description: Get public pet profile successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get public pet profile successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                       example: Milu
 *                     type:
 *                       type: string
 *                       example: dog
 *                     breed:
 *                       type: string
 *                       example: Poodle
 *                     gender:
 *                       type: string
 *                       example: male
 *                     dob:
 *                       type: string
 *                       format: date-time
 *                     weight:
 *                       type: number
 *                       example: 4.5
 *                     color:
 *                       type: string
 *                       example: white
 *                     microchipId:
 *                       type: string
 *                       example: MC-001
 *                     publicCode:
 *                       type: string
 *                       example: pet_ab12cd34ef
 *                     publicProfileUrl:
 *                       type: string
 *                       example: https://your-frontend-domain.vercel.app/pet/pet_ab12cd34ef
 *                     avatar:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                         publicId:
 *                           type: string
 *                     qrCode:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           example: https://res.cloudinary.com/your-cloud/image/upload/v1234567890/pawtal/qr/pet_qr.png
 *                         publicId:
 *                           type: string
 *                           example: pawtal/qr/pet_qr_abc123
 *       404:
 *         description: Pet not found
 */
router.get('/public/:publicCode',getPublicPetProfile);
module.exports = router;
