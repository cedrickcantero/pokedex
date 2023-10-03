const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const connectMongoDB = require('../db/mongoConnection'); // Import your existing connection function

// Path to your JSON file
const pokedexJSONPath = path.join(__dirname, '..', 'pokedex-migration', 'pokedex.json');
const itemsJSONPath = path.join(__dirname, '..', 'pokedex-migration', 'items.json');
const movesJSONPath = path.join(__dirname, '..', 'pokedex-migration', 'moves.json');
const typesJSONPath = path.join(__dirname, '..', 'pokedex-migration', 'types.json');

// Read JSON data from file
const pokedexJsonData = fs.readFileSync(pokedexJSONPath, 'utf-8');
const itemsJsonData = fs.readFileSync(itemsJSONPath, 'utf-8');
const movesJsonData = fs.readFileSync(movesJSONPath, 'utf-8');
const typesJsonData = fs.readFileSync(typesJSONPath, 'utf-8');

const pokedexData = JSON.parse(pokedexJsonData);
const itemsData = JSON.parse(itemsJsonData);
const movesData = JSON.parse(movesJsonData);
const typesData = JSON.parse(typesJsonData);

// Use your existing MongoDB connection function
connectMongoDB()
  .then(async () => {
    const db = mongoose.connection;

    // Insert data to MongoDB using mongoose
    if(pokedexData){
        const insertResult = await db.collection('pokemons').insertMany(pokedexData);
        console.log("pokemon documents inserted successfully")
        console.log(`Inserted ${insertResult.insertedCount} documents to the collection.`);
    }

    if(itemsData){
        const insertResult = await db.collection('items').insertMany(itemsData);
        console.log("items documents inserted successfully")
        console.log(`Inserted ${insertResult.insertedCount} documents to the collection.`);
    }

    if(movesData){
        const insertResult = await db.collection('moves').insertMany(movesData);
        console.log("moves documents inserted successfully")
        console.log(`Inserted ${insertResult.insertedCount} documents to the collection.`);
    }

    if(typesData){
        const insertResult = await db.collection('types').insertMany(typesData);
        console.log("types documents inserted successfully")
        console.log(`Inserted ${insertResult.insertedCount} documents to the collection.`);
    }


    // Close the MongoDB connection
    db.close();
  })
  .catch((err) => {
    console.error('An error occurred:', err);
  });
