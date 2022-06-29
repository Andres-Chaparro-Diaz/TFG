const express = require('express');
const SurveyController = require('../controllers/SurveyController');

const router = express.Router();

router.get('/', SurveyController.listall)
router.post('/create/', SurveyController.create)
router.get('/:key/:value', SurveyController.find, SurveyController.show)
router.put('/:key/:value', SurveyController.find, SurveyController.update)
router.delete('/:key/:value', SurveyController.find, SurveyController.deleted)

module.exports = router;