const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const connectMongoDB = require('../db/mongoConnection'); // Import your existing connection function
const Pokemon = require('../models/pokemonModel');

const imageFolderPath = path.join(__dirname, '..', 'pokedex-migration', 'images');

// Use your existing MongoDB connection function
connectMongoDB()
  .then(async () => {
    // Update Pokémon imageName based on files in the images folder
    fs.readdir(imageFolderPath, async (err, files) => {
      if (err) {
        console.error('An error occurred:', err);
        mongoose.connection.close();
        return;
      }

      console.log("files", files);

      const updatePromises = [];

      for (const file of files) {
        const id = parseInt(file.split('.')[0], 10);  // Assumes the filename is like '001.png'
        console.log("id", id);
        
        const updatePromise = Pokemon.updateOne({ id }, { $set: { imageName: file } })
          .then((updateResult) => {
            if (updateResult.nModified === 0) {
              console.log(`No document with id=${id} was updated.`);
            } else {
              console.log(`Updated document with id=${id} to have imageName=${file}`);
            }
          })
          .catch((err) => {
            console.error(`An error occurred while updating id=${id}:`, err);
          });

        updatePromises.push(updatePromise);
      }

      Promise.all(updatePromises)
        .then(() => {
          // All updates are done, close the connection
          mongoose.connection.close();
          console.log("Closed MongoDB connection.");
        })
        .catch((allErr) => {
          console.error('Some updates failed:', allErr);
          mongoose.connection.close();
        });
    });
  })
  .catch((err) => {
    console.error('An error occurred:', err);
    mongoose.connection.close();
  });
