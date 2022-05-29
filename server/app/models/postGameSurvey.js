const mongoose = require('mongoose');

const postGameSurveySchema = new mongoose.Schema({
    username: {
        type: String
    },
    edad: {
        type: String
    },
    contribute: {
        type: String
    },
    onePlayer: {
        type: Number
    },
    twoPlayer: {
        type: Number
    },
    threePlayer: {
        type: Number
    },
    fourPlayer: {
        type: Number
    },
    questions: {
        type: [{
            type: String
        }]
    }
});

const postGameSurvey = mongoose.model('postGameSurvey', postGameSurveySchema);

module.exports = postGameSurvey;