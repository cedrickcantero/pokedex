const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/pokedex', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Check if the database "pokedex" already exists
    const adminDb = mongoose.connection.db.admin();
    const databases = await adminDb.listDatabases();
    const pokedexExists = databases.databases.some((db) => db.name === 'pokedex');

    if (!pokedexExists) {

      await adminDb.command({ create: 'pokedex' });
      console.log("Pokedex Database Created")
  
    }else{
      console.log("Pokedex Database already exists")
    }

    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectMongoDB;
