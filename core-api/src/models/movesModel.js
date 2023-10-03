const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  accuracy: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  cname: {
    type: String,
    required: true
  },
  ename: {
    type: String,
    required: true
  },
  jname: {
    type: String,
    required: true
  },
  power: {
    type: Number,
    required: true
  },
  pp: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Move', moveSchema);
