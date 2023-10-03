const express = require('express');
const movesController = require('../controllers/movesController');

const router = express.Router();

router.route('/')
  .get(movesController.getAllMoves)
  .post(movesController.createMove);

router.route('/:id')
  .get(movesController.getMoveById)
  .put(movesController.updateMove)
  .delete(movesController.deleteMove);

module.exports = router;
