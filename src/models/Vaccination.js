const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true, index: true },
  vaccineName: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  nextDueDate: { type: Date },
  provider: { type: String, trim: true },
  status: { type: String, enum: ['done', 'pending'], default: 'done' },
  notes: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Vaccination', vaccinationSchema);
