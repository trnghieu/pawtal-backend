const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['food', 'accessory', 'toy', 'medicine', 'hygiene'],
    required: true
  },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, trim: true },
  image: imageSchema,
  stock: { type: Number, default: 0, min: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
