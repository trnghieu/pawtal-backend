const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pawtal API',
      version: '1.0.0',
      description: 'API backend cho web dịch vụ thú cưng Pawtal, có Swagger và upload ảnh bằng Cloudinary.'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server'
      }
    ],
    tags: [
      { name: 'Auth', description: 'Xác thực người dùng' },
      { name: 'Users', description: 'Thông tin chủ nuôi' },
      { name: 'Pets', description: 'Quản lý thú cưng' },
      { name: 'Health Records', description: 'Hồ sơ sức khỏe thú cưng' },
      { name: 'Vaccinations', description: 'Lịch sử tiêm chủng' },
      { name: 'Medical Visits', description: 'Nhật ký thăm khám' },
      { name: 'Products', description: 'Sản phẩm cửa hàng' },
      { name: 'Orders', description: 'Đơn hàng' },
      { name: 'Services', description: 'Dịch vụ thú cưng' },
      { name: 'Appointments', description: 'Đặt lịch dịch vụ' },
      { name: 'Uploads', description: 'Upload ảnh Cloudinary' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        ImageAsset: {
          type: 'object',
          properties: {
            url: { type: 'string', example: 'https://res.cloudinary.com/demo/image/upload/pawtal/pets/abc.jpg' },
            publicId: { type: 'string', example: 'pawtal/pets/abc' }
          }
        },
        UserProfile: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            address: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
            avatar: { $ref: '#/components/schemas/ImageAsset' }
          }
        },
        Pet: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            owner: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string', enum: ['dog', 'cat'] },
            breed: { type: 'string' },
            gender: { type: 'string', enum: ['male', 'female'] },
            dob: { type: 'string', format: 'date-time' },
            weight: { type: 'number' },
            color: { type: 'string' },
            microchipId: { type: 'string' },
            avatar: { $ref: '#/components/schemas/ImageAsset' }
          }
        },
        HealthRecord: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            pet: { type: 'string' },
            bloodType: { type: 'string' },
            allergies: { type: 'string' },
            chronicDiseases: { type: 'string' },
            sterilized: { type: 'boolean' },
            notes: { type: 'string' }
          }
        },
        Vaccination: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            pet: { type: 'string' },
            vaccineName: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            nextDueDate: { type: 'string', format: 'date-time' },
            provider: { type: 'string' },
            status: { type: 'string', enum: ['done', 'pending'] },
            notes: { type: 'string' }
          }
        },
        MedicalVisit: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            pet: { type: 'string' },
            visitDate: { type: 'string', format: 'date-time' },
            reason: { type: 'string' },
            diagnosis: { type: 'string' },
            treatment: { type: 'string' },
            clinic: { type: 'string' },
            vetName: { type: 'string' },
            nextVisitDate: { type: 'string', format: 'date-time' }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            category: { type: 'string', enum: ['food', 'accessory', 'toy', 'medicine', 'hygiene'] },
            price: { type: 'number' },
            description: { type: 'string' },
            stock: { type: 'number' },
            image: { $ref: '#/components/schemas/ImageAsset' },
            isActive: { type: 'boolean' }
          }
        },
        Service: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            duration: { type: 'number' },
            image: { $ref: '#/components/schemas/ImageAsset' },
            isActive: { type: 'boolean' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: { type: 'string' },
                  quantity: { type: 'number' },
                  price: { type: 'number' },
                  subtotal: { type: 'number' }
                }
              }
            },
            totalAmount: { type: 'number' },
            status: { type: 'string', enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'] },
            shippingAddress: { type: 'string' }
          }
        },
        Appointment: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            pet: { type: 'string' },
            service: { type: 'string' },
            appointmentDate: { type: 'string', format: 'date-time' },
            timeSlot: { type: 'string' },
            status: { type: 'string', enum: ['booked', 'confirmed', 'done', 'cancelled'] },
            notes: { type: 'string' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Bad request' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJSDoc(options);
