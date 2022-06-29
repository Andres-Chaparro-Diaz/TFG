const mongoose = require('mongoose');

const EmotionalSurveySchema = new mongoose.Schema({
    username: {
        type: String
    },
    motivado: {
        type: Number
    },
    animo: {
        type: Number
    }
});

const EmotionalSurvey = mongoose.model('EmotionalSurvey', EmotionalSurveySchema);

module.exports = EmotionalSurvey;