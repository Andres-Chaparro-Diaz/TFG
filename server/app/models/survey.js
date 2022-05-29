const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    username: {
        type: String
    },
    edad: {
        type: String
    },
    contribute: {
        type: String
    },
    questions: {
        type: [{
            type: String
        }]
    }
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;