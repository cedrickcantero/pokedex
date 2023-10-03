const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/pokedex', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectMongoDB;
