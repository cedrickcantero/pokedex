
const express = require('express');
const cors = require('cors');
const allRoutes = require('./routes/routeManager');
const mongoose = require('mongoose');
const connectMongoDB = require('./db/mongoConnection');

// Initialize MongoDB connection
connectMongoDB();

// Initialize the application
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());


// Centralized API Routes
app.use('/api',  allRoutes);

// Start the application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
