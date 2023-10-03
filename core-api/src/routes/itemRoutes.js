const express = require('express');
const itemsController = require('../controllers/itemController');

const router = express.Router();

router.route('/')
  .get(itemsController.getAllItems)
  .post(itemsController.createItem);

router.route('/:id')
  .get(itemsController.getItemById)
  .put(itemsController.updateItem)
  .delete(itemsController.deleteItem);

module.exports = router;
