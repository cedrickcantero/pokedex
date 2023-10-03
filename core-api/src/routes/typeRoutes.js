const express = require('express');
const typesController = require('../controllers/typesController');

const router = express.Router();

router.route('/')
  .get(typesController.getAllTypes)
  .post(typesController.createType);

router.route('/:id')
  .get(typesController.getTypeById)
  .put(typesController.updateType)
  .delete(typesController.deleteType);

module.exports = router;
