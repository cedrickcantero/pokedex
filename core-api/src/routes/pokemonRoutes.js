const express = require('express');
const {
  getAllPokemon,
  createPokemon,
  getPokemonById,
  getPokemonByName,
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

  router.route('/name/:name')
  .get(getPokemonByName)

  
module.exports = router;
