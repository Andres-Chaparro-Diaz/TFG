var splide;
var app = {
    abrirLogin: function() {
        var v = new LoginController();
        v.createEventsLogin();
    },
    abrirRegister: function() {
        var v = new RegisterController();
        v.createEventsRegister();
    },
    abrirRanking: function() {
        var v = new RankingController();
        v.loadGlobalRank();
        v.loadPersonalRank();
    },
    abrirSurvey: function() {
        var v = new SurveyController();
        v.createEventListener();
    },
    abrirSurveyPostGame: function() {
        var v = new PostGameSurveyController();
        v.createEventListener();
    },
    abrirSurveyEmocional: function() {
        var v = new EmotionalSurveyController();
        splide = v.createEventListener();
    },
    abrirGame: function() {
        loadGame();
    },
    abrirChangePassword: function() {
        var v = new LoginController();
        v.createEventsChangePassword();
    }

}