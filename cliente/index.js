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
    abrirGame: function() {
        var v = new VistaLogin();
        v.loadEvents();
    }
}