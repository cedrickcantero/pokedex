const Pokemon = require('../models/pokemonModel');

exports.getAllPokemon = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.status(200).json(pokemons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPokemon = async (req, res) => {
  try {
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.status(201).json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
    res.status(200).json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePokemon = async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPokemon) return res.status(404).json({ message: 'Pokemon not found' });
    res.status(200).json(updatedPokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePokemon = async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!deletedPokemon) return res.status(404).json({ message: 'Pokemon not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
