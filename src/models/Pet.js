const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String }
}, { _id: false });

const petSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['dog', 'cat'], required: true },
  breed: { type: String, trim: true },
  gender: { type: String, enum: ['male', 'female'] },
  dob: { type: Date },
  weight: { type: Number, min: 0 },
  color: { type: String, trim: true },
  microchipId: { type: String, trim: true },
  avatar: imageSchema
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
