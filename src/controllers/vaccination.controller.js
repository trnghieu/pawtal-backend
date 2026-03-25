const Pet = require('../models/Pet');
const Vaccination = require('../models/Vaccination');
const catchAsync = require('../utils/catchAsync');

const ensurePetOwner = async (petId, userId) => {
  return Pet.findOne({ _id: petId, owner: userId });
};

const createVaccination = catchAsync(async (req, res) => {
  const { pet, vaccineName, date, nextDueDate, provider, status, notes } = req.body;

  if (!pet || !vaccineName || !date) {
    return res.status(400).json({
      success: false,
      message: 'pet, vaccineName and date are required'
    });
  }

  const ownedPet = await ensurePetOwner(pet, req.user._id);
  if (!ownedPet) {
    return res.status(404).json({ success: false, message: 'Pet not found' });
  }

  const vaccination = await Vaccination.create({
    pet,
    vaccineName,
    date,
    nextDueDate,
    provider,
    status,
    notes
  });

  return res.status(201).json({
    success: true,
    message: 'Create vaccination successfully',
    data: vaccination
  });
});

const getVaccinationsByPet = catchAsync(async (req, res) => {
  const pet = await ensurePetOwner(req.params.petId, req.user._id);
  if (!pet) {
    return res.status(404).json({ success: false, message: 'Pet not found' });
  }

  const vaccinations = await Vaccination.find({ pet: pet._id }).sort({ date: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get vaccinations successfully',
    data: vaccinations
  });
});

const getVaccinationById = catchAsync(async (req, res) => {
  const vaccination = await Vaccination.findById(req.params.id).populate('pet', 'name owner');

  if (!vaccination || String(vaccination.pet.owner) !== String(req.user._id)) {
    return res.status(404).json({ success: false, message: 'Vaccination not found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Get vaccination successfully',
    data: vaccination
  });
});

const updateVaccination = catchAsync(async (req, res) => {
  const vaccination = await Vaccination.findById(req.params.id).populate('pet', 'owner');

  if (!vaccination || String(vaccination.pet.owner) !== String(req.user._id)) {
    return res.status(404).json({ success: false, message: 'Vaccination not found' });
  }

  const fields = ['vaccineName', 'date', 'nextDueDate', 'provider', 'status', 'notes'];
  fields.forEach((field) => {
    if (typeof req.body[field] !== 'undefined') {
      vaccination[field] = req.body[field];
    }
  });

  await vaccination.save();

  return res.status(200).json({
    success: true,
    message: 'Update vaccination successfully',
    data: vaccination
  });
});

const deleteVaccination = catchAsync(async (req, res) => {
  const vaccination = await Vaccination.findById(req.params.id).populate('pet', 'owner');

  if (!vaccination || String(vaccination.pet.owner) !== String(req.user._id)) {
    return res.status(404).json({ success: false, message: 'Vaccination not found' });
  }

  await vaccination.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Delete vaccination successfully'
  });
});

module.exports = {
  createVaccination,
  getVaccinationsByPet,
  getVaccinationById,
  updateVaccination,
  deleteVaccination
};
