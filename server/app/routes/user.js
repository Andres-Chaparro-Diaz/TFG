const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.listall)
router.post('/create/', UserController.create)
router.post('/login/', UserController.login)
router.post('/register/', UserController.register)
router.post('/addRecord/', UserController.addRecord)
router.post('/getRecords/', UserController.getRecords)
router.post('/getGlobalRecords/', UserController.getAllRecords)
router.get('/:key/:value', UserController.find, UserController.show)
router.put('/:key/:value', UserController.find, UserController.update)
router.delete('/:key/:value', UserController.find, UserController.deleted)

module.exports = router;