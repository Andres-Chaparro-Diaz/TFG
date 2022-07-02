const mongoose = require('mongoose');

const EmotionalSurveySchema = new mongoose.Schema({
    username: {
        type: String
    },
    motivado: {
        type: Number
    },
    emocion: {
        type: String
    }
});

const EmotionalSurvey = mongoose.model('EmotionalSurvey', EmotionalSurveySchema);

module.exports = EmotionalSurvey;