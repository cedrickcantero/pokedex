const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  id: Number,
  name: {
    english: String,
    japanese: String,
    chinese: String,
  },
});
module.exports = mongoose.model('Item', itemSchema);
