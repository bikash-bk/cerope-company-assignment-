const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  avatar: String, // store image URL or chosen avatar id
  dob: Date,
  phone: String,
  gender: { type: String, enum: ['male','female','other', ''] },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
