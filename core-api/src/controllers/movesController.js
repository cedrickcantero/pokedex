const Move = require('../models/movesModel');

// Get All Moves
exports.getAllMoves = async (req, res) => {
  try {
    const query = {};
    if (req.query.type) {
      query['type'] = { $in: [req.query.type] };
    }

    const moves = await Move.find(query);
    res.status(200).json(moves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create New Move
exports.createMove = async (req, res) => {
  try {
    const newMove = new Move(req.body);
    await newMove.save();
    res.status(201).json(newMove);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Move by ID
exports.getMoveById = async (req, res) => {
  try {
    const move = await Move.findById(req.params.id);
    if (!move) return res.status(404).json({ error: 'Move not found' });
    res.status(200).json(move);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMoveByName = async (req, res) => {
  try {
    console.log("req.params.name",req.params.name)
    const item = await Item.findOne({ename: req.params.name});
    if (!item) return res.status(404).json({ message: 'Move not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 }

// Update Move by ID
exports.updateMove = async (req, res) => {
  try {
    const updatedMove = await Move.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMove) return res.status(404).json({ error: 'Move not found' });
    res.status(200).json(updatedMove);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Move by ID
exports.deleteMove = async (req, res) => {
  try {
    const deletedMove = await Move.findByIdAndDelete(req.params.id);
    if (!deletedMove) return res.status(404).json({ error: 'Move not found' });
    res.status(204).json({ message: 'Move deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
