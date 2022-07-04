const mongoose = require('mongoose');

const postGameSurveySchema = new mongoose.Schema({
    username: {
        type: String
    },
    gustadoAnswer: {
        type: String
    },
    jugarHabitualAnswer: {
        type: String
    },
    concentracionAnswer: {
        type: String
    },
    artisticoAnswer: {
        type: String
    },
    simpleAnswer: {
        type: String
    },
    onePlayerDifficult: {
        type: String
    },
    twoPlayerDifficult: {
        type: String
    },
    threePlayerDifficult: {
        type: String
    },
    fourPlayerDifficult: {
        type: String
    },
    improvements: {
        type: String
    }
}, { timestamps: true });

const postGameSurvey = mongoose.model('postGameSurvey', postGameSurveySchema);

module.exports = postGameSurvey;