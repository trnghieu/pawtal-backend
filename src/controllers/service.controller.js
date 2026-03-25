const Service = require('../models/Service');
const catchAsync = require('../utils/catchAsync');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const createService = catchAsync(async (req, res) => {
  const { name, description, price, duration, isActive } = req.body;

  if (!name || typeof price === 'undefined' || typeof duration === 'undefined') {
    return res.status(400).json({
      success: false,
      message: 'name, price and duration are required'
    });
  }

  let image = undefined;
  if (req.file) {
    image = await uploadBufferToCloudinary(req.file, 'pawtal/services');
  }

  const service = await Service.create({
    name,
    description,
    price,
    duration,
    isActive,
    image
  });

  return res.status(201).json({
    success: true,
    message: 'Create service successfully',
    data: service
  });
});

const getServices = catchAsync(async (req, res) => {
  const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get services successfully',
    data: services
  });
});

const getServiceById = catchAsync(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service || !service.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Get service successfully',
    data: service
  });
});

const updateService = catchAsync(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  const fields = ['name', 'description', 'price', 'duration', 'isActive'];
  fields.forEach((field) => {
    if (typeof req.body[field] !== 'undefined') {
      service[field] = req.body[field];
    }
  });

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(req.file, 'pawtal/services');
    if (service.image && service.image.publicId) {
      await deleteFromCloudinary(service.image.publicId);
    }
    service.image = uploaded;
  }

  await service.save();

  return res.status(200).json({
    success: true,
    message: 'Update service successfully',
    data: service
  });
});

const deleteService = catchAsync(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  if (service.image && service.image.publicId) {
    await deleteFromCloudinary(service.image.publicId);
  }

  await service.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Delete service successfully'
  });
});

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
};
