const express = require('express');
const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  getItemByName,
} = require('../controllers/itemController');

const router = express.Router();

router.route('/')
  .get(getAllItems)
  .post(createItem);

router.route('/:id')
  .get(getItemById)
  .put(updateItem)
  .delete(deleteItem);

router.route('/name/:name')
  .get(getItemByName);

module.exports = router;
