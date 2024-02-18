const express = require('express');
const path = require('path');

const router = express.Router();
let fileName = path.basename(__filename, '.js');
const controller = require(`../controllers/${fileName}`);

router.get('/', controller.index)
router.get('/random', controller.random)
router.get('/:id', controller.detail)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)
router.post('/', controller.create)

module.exports = router;
