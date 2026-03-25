const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String }
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  duration: { type: Number, required: true, min: 0 },
  image: imageSchema,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
