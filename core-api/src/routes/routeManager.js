const express = require('express');
const itemRoutes = require('./itemRoutes');
const movesRoutes = require('./movesRoutes');
const pokemonRoutes = require('./pokemonRoutes');
const typeRoutes = require('./typeRoutes');

const router = express.Router();

router.use('/items', itemRoutes);
router.use('/moves', movesRoutes);
router.use('/pokemon', pokemonRoutes);
router.use('/types', typeRoutes);

module.exports = router;
