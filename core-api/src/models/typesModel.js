const mongoose = require('mongoose');

const typesSchema = new mongoose.Schema({
  english: String,
  chinese: String,
  japanese: String,
});

module.exports = mongoose.model('Type', typesSchema);
