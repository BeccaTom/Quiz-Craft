const express = require('express');
const router = express.Router();
const path = require('path');
let fileName = path.basename(__filename, '.js');
const controller = require(`../controllers/${fileName}`);

router.get('/', controller.index)
router.get('/statistics', controller.statistics)
router.get('/:id', controller.detail)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)
router.post('/', controller.create)
router.post('/del', controller.del)

module.exports = router;
