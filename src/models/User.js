const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  avatar: imageSchema,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
