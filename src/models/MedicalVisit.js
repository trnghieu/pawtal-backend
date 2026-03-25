const mongoose = require('mongoose');

const medicalVisitSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true, index: true },
  visitDate: { type: Date, required: true },
  reason: { type: String, trim: true },
  diagnosis: { type: String, trim: true },
  treatment: { type: String, trim: true },
  clinic: { type: String, trim: true },
  vetName: { type: String, trim: true },
  nextVisitDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('MedicalVisit', medicalVisitSchema);
