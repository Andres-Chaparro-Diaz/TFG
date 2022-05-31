const express = require('express');
const PostGameSurvey = require('../controllers/PostGameSurveyController');

const router = express.Router();

router.get('/', PostGameSurvey.listall)
router.post('/create/', PostGameSurvey.create)
router.get('/:key/:value', PostGameSurvey.find, PostGameSurvey.show)
router.put('/:key/:value', PostGameSurvey.find, PostGameSurvey.update)
router.delete('/:key/:value', PostGameSurvey.find, PostGameSurvey.deleted)

module.exports = router;