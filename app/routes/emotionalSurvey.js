const express = require('express');
const EmotionalSurvey = require('../controllers/EmotionalSurveyController');

const router = express.Router();

router.get('/', EmotionalSurvey.listall)
router.post('/create/', EmotionalSurvey.create)
router.get('/:key/:value', EmotionalSurvey.find, EmotionalSurvey.show)
router.put('/:key/:value', EmotionalSurvey.find, EmotionalSurvey.update)
router.delete('/:key/:value', EmotionalSurvey.find, EmotionalSurvey.deleted)

module.exports = router;