const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

// Path to your JSON file
const pokedexJSONPath = '../pokedex/items.json';


// Read JSON data from file
const jsonData = fs.readFileSync(pokedexJSONPath, 'utf-8');

const pokedexData = JSON.parse(jsonData);

// Connection URL and Database name
const url = 'mongodb://localhost:27017/';

const dbName = 'pokedex';


const initDb = async () => {
    let client;
  
    try {
      // Connect to MongoDB
      client = await MongoClient.connect(url, { useUnifiedTopology: true });
  
      console.log("Successfully connected to MongoDB.");
  
      const db = client.db(dbName);
  
      // Insert data to MongoDB
      const res = await db.collection('items').insertMany(pokedexData);
  
      console.log(`Inserted ${res.insertedCount} documents to the collection.`);
    } catch (err) {
      console.error('An error occurred:', err);
    } finally {
      // Close the client
      if (client) {
        client.close();
      }
    }
  };
  
  initDb();
