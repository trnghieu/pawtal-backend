const Pet = require('../models/Pet');
const HealthRecord = require('../models/HealthRecord');
const Vaccination = require('../models/Vaccination');
const MedicalVisit = require('../models/MedicalVisit');
const catchAsync = require('../utils/catchAsync');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const createPet = catchAsync(async (req, res) => {
  const { name, type, breed, gender, dob, weight, color, microchipId } = req.body;

  if (!name || !type) {
    return res.status(400).json({
      success: false,
      message: 'name and type are required'
    });
  }

  let avatar = undefined;
  if (req.file) {
    avatar = await uploadBufferToCloudinary(req.file, 'pawtal/pets');
  }

  const pet = await Pet.create({
    owner: req.user._id,
    name,
    type,
    breed,
    gender,
    dob,
    weight,
    color,
    microchipId,
    avatar
  });

  return res.status(201).json({
    success: true,
    message: 'Create pet successfully',
    data: pet
  });
});

const getMyPets = catchAsync(async (req, res) => {
  const pets = await Pet.find({ owner: req.user._id }).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get pets successfully',
    data: pets
  });
});

const getPetById = catchAsync(async (req, res) => {
  const pet = await Pet.findOne({ _id: req.params.id, owner: req.user._id });

  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Get pet successfully',
    data: pet
  });
});

const updatePet = catchAsync(async (req, res) => {
  const pet = await Pet.findOne({ _id: req.params.id, owner: req.user._id });

  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  const fields = ['name', 'type', 'breed', 'gender', 'dob', 'weight', 'color', 'microchipId'];
  fields.forEach((field) => {
    if (typeof req.body[field] !== 'undefined') {
      pet[field] = req.body[field];
    }
  });

  if (req.file) {
    const uploaded = await uploadBufferToCloudinary(req.file, 'pawtal/pets');
    if (pet.avatar && pet.avatar.publicId) {
      await deleteFromCloudinary(pet.avatar.publicId);
    }
    pet.avatar = uploaded;
  }

  await pet.save();

  return res.status(200).json({
    success: true,
    message: 'Update pet successfully',
    data: pet
  });
});

const deletePet = catchAsync(async (req, res) => {
  const pet = await Pet.findOne({ _id: req.params.id, owner: req.user._id });

  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  if (pet.avatar && pet.avatar.publicId) {
    await deleteFromCloudinary(pet.avatar.publicId);
  }

  await HealthRecord.deleteOne({ pet: pet._id });
  await Vaccination.deleteMany({ pet: pet._id });
  await MedicalVisit.deleteMany({ pet: pet._id });
  await pet.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Delete pet successfully'
  });
});

const getPetDashboard = catchAsync(async (req, res) => {
  const pet = await Pet.findOne({ _id: req.params.id, owner: req.user._id });

  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  const [healthRecord, vaccinations, medicalVisits] = await Promise.all([
    HealthRecord.findOne({ pet: pet._id }),
    Vaccination.find({ pet: pet._id }).sort({ date: -1 }),
    MedicalVisit.find({ pet: pet._id }).sort({ visitDate: -1 })
  ]);

  return res.status(200).json({
    success: true,
    message: 'Get pet dashboard successfully',
    data: {
      pet,
      healthRecord,
      vaccinations,
      medicalVisits
    }
  });
});

module.exports = {
  createPet,
  getMyPets,
  getPetById,
  updatePet,
  deletePet,
  getPetDashboard
};
