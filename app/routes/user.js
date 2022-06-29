const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/login/', function(req, res) {
    console.log("hola que tal");
    UserController.login(req, res);
})
router.post('/register/', UserController.register)
router.post('/addRecord/', UserController.addRecord)
router.post('/getRecords/', UserController.getRecords)
router.post('/checkUser/', UserController.checkUser)
router.post('/sendEmail/', UserController.sendEmail)
router.post('/changePassword/', UserController.changePassword)
router.post('/getGlobalRecords/', UserController.getAllRecords)


module.exports = router;