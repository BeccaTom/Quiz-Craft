const express = require('express');

const router = express.Router();
const path = require('path');
const fileName = path.basename(__filename, '.js');
const controller = require(`../controllers/${fileName}`);

router.get('/', controller.index)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)
router.post('/', controller.create)
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/updatePwd', controller.updatePwd);

module.exports = router;
