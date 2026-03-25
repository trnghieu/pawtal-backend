const Pet = require('../models/Pet');
const HealthRecord = require('../models/HealthRecord');
const catchAsync = require('../utils/catchAsync');

const getPetOwnership = async (petId, userId) => {
  return Pet.findOne({ _id: petId, owner: userId });
};

const getHealthRecordByPet = catchAsync(async (req, res) => {
  const pet = await getPetOwnership(req.params.petId, req.user._id);
  if (!pet) {
    return res.status(404).json({ success: false, message: 'Pet not found' });
  }

  const record = await HealthRecord.findOne({ pet: pet._id });

  return res.status(200).json({
    success: true,
    message: 'Get health record successfully',
    data: record
  });
});

const upsertHealthRecord = catchAsync(async (req, res) => {
  const pet = await getPetOwnership(req.params.petId, req.user._id);
  if (!pet) {
    return res.status(404).json({ success: false, message: 'Pet not found' });
  }

  const payload = {
    pet: pet._id,
    bloodType: req.body.bloodType,
    allergies: req.body.allergies,
    chronicDiseases: req.body.chronicDiseases,
    sterilized: req.body.sterilized,
    notes: req.body.notes
  };

  const record = await HealthRecord.findOneAndUpdate(
    { pet: pet._id },
    payload,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return res.status(200).json({
    success: true,
    message: 'Upsert health record successfully',
    data: record
  });
});

module.exports = {
  getHealthRecordByPet,
  upsertHealthRecord
};
