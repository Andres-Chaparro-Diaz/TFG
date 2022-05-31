const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/login/', UserController.login)
router.post('/register/', UserController.register)
router.post('/addRecord/', UserController.addRecord)
router.post('/getRecords/', UserController.getRecords)
router.post('/getGlobalRecords/', UserController.getAllRecords)


module.exports = router;