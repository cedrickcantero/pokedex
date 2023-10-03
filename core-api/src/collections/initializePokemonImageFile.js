const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectMongoDB = require('../db/mongoConnection');
const Pokemon = require('../models/pokemonModel');

const imageFolderPath = path.join(__dirname, '..', 'pokedex-migration', 'images');

// Use your existing MongoDB connection function
connectMongoDB()
  .then(async () => {
    fs.readdir(imageFolderPath, async (err, files) => {
      if (err) {
        console.error('An error occurred:', err);
        mongoose.connection.close();
        return;
      }

      console.log("files", files);

      const updatePromises = [];

      for (const file of files) {
        const id = parseInt(file.split('.')[0], 10);
        const filePath = path.join(imageFolderPath, file);
        const imageData = fs.readFileSync(filePath);

        console.log("imageData", imageData);

        const updatePromise = Pokemon.updateOne(
          { id },
          { 
            $set: { 
              'image.data': imageData,
              'image.contentType': 'image/png' // assuming all images are PNGs
            } 
          }
        )
        .then((updateResult) => {
          if (updateResult.nModified === 0) {
            console.log(`No document with id=${id} was updated.`);
          } else {
            console.log(`Updated document with id=${id} to have image data.`);
          }
        })
        .catch((err) => {
          console.error(`An error occurred while updating id=${id}:`, err);
        });

        updatePromises.push(updatePromise);
      }

      Promise.all(updatePromises)
        .then(() => {
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
