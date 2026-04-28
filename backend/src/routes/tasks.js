const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.route('/').get(controller.getAll).post(controller.create);
router.route('/:id').patch(controller.update).delete(controller.delete);

module.exports = router;
