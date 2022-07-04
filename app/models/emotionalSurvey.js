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
    },
    puntuacion: {
        type: Number
    }
}, { timestamps: true });

const EmotionalSurvey = mongoose.model('EmotionalSurvey', EmotionalSurveySchema);

module.exports = EmotionalSurvey;