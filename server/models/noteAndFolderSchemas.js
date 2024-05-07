const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  path: String,
  folder: String,
  user: mongoose.Schema.Types.ObjectId, 
  size: Number,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('File', FileSchema);