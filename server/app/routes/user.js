const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.listall)
router.post('/create/', UserController.create)
router.get('/:key/:value', UserController.find, UserController.show)
router.put('/:key/:value', UserController.find, UserController.update)
router.delete('/:key/:value', UserController.find, UserController.deleted)

module.exports = router;