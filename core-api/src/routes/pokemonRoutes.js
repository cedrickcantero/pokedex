const express = require('express');
const {
  getAllPokemon,
  createPokemon,
  getPokemonById,
  updatePokemon,
  deletePokemon
} = require('../controllers/pokemonController');

const router = express.Router();

router.route('/')
  .get(getAllPokemon)
  .post(createPokemon);

router.route('/:id')
  .get(getPokemonById)
  .put(updatePokemon)
  .delete(deletePokemon);

module.exports = router;
