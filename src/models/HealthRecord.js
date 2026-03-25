const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true, unique: true },
  bloodType: { type: String, trim: true },
  allergies: { type: String, trim: true },
  chronicDiseases: { type: String, trim: true },
  sterilized: { type: Boolean, default: false },
  notes: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
