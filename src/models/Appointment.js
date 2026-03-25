const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['booked', 'confirmed', 'done', 'cancelled'],
    default: 'booked'
  },
  notes: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
