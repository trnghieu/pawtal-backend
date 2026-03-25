const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Service = require('../models/Service');
const catchAsync = require('../utils/catchAsync');

const createAppointment = catchAsync(async (req, res) => {
  const { pet, service, appointmentDate, timeSlot, notes } = req.body;

  if (!pet || !service || !appointmentDate || !timeSlot) {
    return res.status(400).json({
      success: false,
      message: 'pet, service, appointmentDate and timeSlot are required'
    });
  }

  const ownedPet = await Pet.findOne({ _id: pet, owner: req.user._id });
  if (!ownedPet) {
    return res.status(404).json({ success: false, message: 'Pet not found' });
  }

  const serviceDoc = await Service.findById(service);
  if (!serviceDoc || !serviceDoc.isActive) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }

  const appointment = await Appointment.create({
    user: req.user._id,
    pet,
    service,
    appointmentDate,
    timeSlot,
    notes
  });

  const populated = await Appointment.findById(appointment._id)
    .populate('pet', 'name type avatar')
    .populate('service', 'name price duration image');

  return res.status(201).json({
    success: true,
    message: 'Create appointment successfully',
    data: populated
  });
});

const getMyAppointments = catchAsync(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate('pet', 'name type avatar')
    .populate('service', 'name price duration image')
    .sort({ appointmentDate: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get appointments successfully',
    data: appointments
  });
});

const getAppointmentById = catchAsync(async (req, res) => {
  const appointment = await Appointment.findOne({ _id: req.params.id, user: req.user._id })
    .populate('pet', 'name type avatar')
    .populate('service', 'name price duration image');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Get appointment successfully',
    data: appointment
  });
});

const updateAppointment = catchAsync(async (req, res) => {
  const appointment = await Appointment.findOne({ _id: req.params.id, user: req.user._id });

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  if (appointment.status === 'done') {
    return res.status(400).json({
      success: false,
      message: 'Completed appointment cannot be updated'
    });
  }

  const fields = ['appointmentDate', 'timeSlot', 'notes'];
  fields.forEach((field) => {
    if (typeof req.body[field] !== 'undefined') {
      appointment[field] = req.body[field];
    }
  });

  await appointment.save();

  const populated = await Appointment.findById(appointment._id)
    .populate('pet', 'name type avatar')
    .populate('service', 'name price duration image');

  return res.status(200).json({
    success: true,
    message: 'Update appointment successfully',
    data: populated
  });
});

const cancelAppointment = catchAsync(async (req, res) => {
  const appointment = await Appointment.findOne({ _id: req.params.id, user: req.user._id });

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  appointment.status = 'cancelled';
  await appointment.save();

  return res.status(200).json({
    success: true,
    message: 'Cancel appointment successfully',
    data: appointment
  });
});

const getAllAppointments = catchAsync(async (req, res) => {
  const appointments = await Appointment.find()
    .populate('user', 'name email phone')
    .populate('pet', 'name type avatar')
    .populate('service', 'name price duration')
    .sort({ appointmentDate: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get all appointments successfully',
    data: appointments
  });
});

const updateAppointmentStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const allowed = ['booked', 'confirmed', 'done', 'cancelled'];

  if (!allowed.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    });
  }

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  )
    .populate('user', 'name email')
    .populate('pet', 'name type')
    .populate('service', 'name');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Update appointment status successfully',
    data: appointment
  });
});

module.exports = {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getAllAppointments,
  updateAppointmentStatus
};
