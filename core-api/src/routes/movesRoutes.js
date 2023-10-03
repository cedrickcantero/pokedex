const express = require('express');
const movesController = require('../controllers/movesController');
const {
  getAllMoves,
  createMove,
  getMoveById,
  updateMove,
  deleteMove,
  getMoveByName
} = require('../controllers/movesController');

const router = express.Router();

router.route('/')
  .get(getAllMoves)
  .post(createMove);

router.route('/:id')
  .get(getMoveById)
  .put(updateMove)
  .delete(deleteMove);

router.route('/name/:name')
  .get(getMoveByName)


module.exports = router;
