var splide;
var app = {
    abrirLogin: function() {
        this.destroyGame()
        var v = new LoginController();
        v.createEventsLogin();
    },
    abrirRegister: function() {
        this.destroyGame()
        var v = new RegisterController();
        v.createEventsRegister();
    },
    abrirRanking: function() {
        this.destroyGame()
        var v = new RankingController();
        v.loadGlobalRank();
        v.loadPersonalRank();
    },
    abrirSurvey: function() {
        this.destroyGame()
        var v = new SurveyController();
        v.createEventListener();
    },
    abrirSurveyPostGame: function() {
        this.destroyGame()
        var v = new PostGameSurveyController();
        v.createEventListener();
    },
    abrirSurveyEmocional: function() {
        this.destroyGame()
        var v = new EmotionalSurveyController();
        splide = v.createEventListener();
    },
    abrirGame: function() {
        this.destroyGame()
        loadGame();
    },
    abrirChangePassword: function() {
        this.destroyGame()
        var v = new LoginController();
        v.createEventsChangePassword();
    },
    abrirIntroduccion: function() {
        this.destroyGame()
    },
    abrirPrivacidad: function() {
        this.destroyGame()
    },
    abrirAcercaDe: function() {
        this.destroyGame()
    },
    destroyGame: function() {
        if (game != null && game != undefined) {
            if (game.isRunning) {
                game.scene.scenes[1].input.keyboard.enabled = false
                game.scene.stop()
                game.renderer.destroy();
                game.loop.stop();
                game.canvas.remove();
                game.destroy(true);
            }
        }
    },
}