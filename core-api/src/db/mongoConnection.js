require('dotenv').config();
const mongoose = require('mongoose');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const MONGO_HOST = process.env.MONGO_HOST || 'localhost'; 

console.log("MONG_HOST",MONGO_HOST);

const connectMongoDB = async () => {
  try {
    const connectionString = `mongodb://${MONGO_HOST}:27017/pokedex`;
    const connection = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    connection.connection.on('connected', async () => {
      const adminDb = connection.connection.db.admin();
      const databases = await adminDb.listDatabases();
      const pokedexExists = databases.databases.some((db) => db.name === 'pokedex');

      if (!pokedexExists) {
        await adminDb.command({ create: 'pokedex' });
        console.log("Pokedex Database Created");
      } else {
        console.log("Pokedex Database already exists");
      }

      console.log('MongoDB connected');
      eventEmitter.emit('mongodb_connected');
    });

  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectMongoDB,
  eventEmitter
};
