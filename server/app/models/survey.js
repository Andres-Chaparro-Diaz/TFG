const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    username: {
        type: String
    },
    edad: {
        type: String
    },
    cuantoJuegasAnswer: {
        type: String
    },
    nivelJugandoAnswer: {
        type: String
    },
    variasCosasALaVezAnswer: {
        type: String
    },
    participa: {
        type: Boolean
    }
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;