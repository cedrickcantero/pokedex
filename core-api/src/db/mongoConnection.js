const mongoose = require('mongoose');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/pokedex', {
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
