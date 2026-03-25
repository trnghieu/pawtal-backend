const Pet = require('../models/Pet');
const MedicalVisit = require('../models/MedicalVisit');
const catchAsync = require('../utils/catchAsync');

const ensurePetOwner = async (petId, userId) => {
  return Pet.findOne({ _id: petId, owner: userId });
};

const createMedicalVisit = catchAsync(async (req, res) => {
  const { pet, visitDate, reason, diagnosis, treatment, clinic, vetName, nextVisitDate } = req.body;

  if (!pet || !visitDate) {
    return res.status(400).json({
      success: false,
      message: 'pet and visitDate are required'
    });
  }

  const ownedPet = await ensurePetOwner(pet, req.user._id);
  if (!ownedPet) {
    return res.status(404).json({ success: false, message: 'Pet not found' });
  }

  const visit = await MedicalVisit.create({
    pet,
    visitDate,
    reason,
    diagnosis,
    treatment,
    clinic,
    vetName,
    nextVisitDate
  });

  return res.status(201).json({
    success: true,
    message: 'Create medical visit successfully',
    data: visit
  });
});

const getMedicalVisitsByPet = catchAsync(async (req, res) => {
  const pet = await ensurePetOwner(req.params.petId, req.user._id);
  if (!pet) {
    return res.status(404).json({ success: false, message: 'Pet not found' });
  }

  const visits = await MedicalVisit.find({ pet: pet._id }).sort({ visitDate: -1 });

  return res.status(200).json({
    success: true,
    message: 'Get medical visits successfully',
    data: visits
  });
});

const getMedicalVisitById = catchAsync(async (req, res) => {
  const visit = await MedicalVisit.findById(req.params.id).populate('pet', 'name owner');

  if (!visit || String(visit.pet.owner) !== String(req.user._id)) {
    return res.status(404).json({ success: false, message: 'Medical visit not found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Get medical visit successfully',
    data: visit
  });
});

const updateMedicalVisit = catchAsync(async (req, res) => {
  const visit = await MedicalVisit.findById(req.params.id).populate('pet', 'owner');

  if (!visit || String(visit.pet.owner) !== String(req.user._id)) {
    return res.status(404).json({ success: false, message: 'Medical visit not found' });
  }

  const fields = ['visitDate', 'reason', 'diagnosis', 'treatment', 'clinic', 'vetName', 'nextVisitDate'];
  fields.forEach((field) => {
    if (typeof req.body[field] !== 'undefined') {
      visit[field] = req.body[field];
    }
  });

  await visit.save();

  return res.status(200).json({
    success: true,
    message: 'Update medical visit successfully',
    data: visit
  });
});

const deleteMedicalVisit = catchAsync(async (req, res) => {
  const visit = await MedicalVisit.findById(req.params.id).populate('pet', 'owner');

  if (!visit || String(visit.pet.owner) !== String(req.user._id)) {
    return res.status(404).json({ success: false, message: 'Medical visit not found' });
  }

  await visit.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Delete medical visit successfully'
  });
});

module.exports = {
  createMedicalVisit,
  getMedicalVisitsByPet,
  getMedicalVisitById,
  updateMedicalVisit,
  deleteMedicalVisit
};
