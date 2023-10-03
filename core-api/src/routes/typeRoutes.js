const express = require('express');
const typesController = require('../controllers/typesController');
const {
  getAllTypes,
  createType,
  getTypeById,
  updateType,
  deleteType,
  getTypeByName
} = require('../controllers/typesController');

const router = express.Router();

router.route('/')
  .get(getAllTypes)
  .post(createType);

router.route('/:id')
  .get(getTypeById)
  .put(updateType)
  .delete(deleteType);

router.route('/name/:name')
  .get(getTypeByName)


module.exports = router;
