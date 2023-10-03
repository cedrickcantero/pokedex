const Type = require('../models/typesModel');

exports.getAllTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createType = async (req, res) => {
  try {
    const type = new Type(req.body);
    await type.save();
    res.status(201).json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type) return res.status(404).json({ message: 'Type not found' });
    res.status(200).json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateType = async (req, res) => {
  try {
    const updatedType = await Type.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedType) return res.status(404).json({ message: 'Type not found' });
    res.status(200).json(updatedType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteType = async (req, res) => {
  try {
    const deletedType = await Type.findByIdAndDelete(req.params.id);
    if (!deletedType) return res.status(404).json({ message: 'Type not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
