var splide;
var app = {
    abrirLogin: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
        var v = new LoginController();
        v.createEventsLogin();
    },
    abrirRegister: function() {
        this.destroyGame()
        var v = new RegisterController();
        v.createEventsRegister();
    },
    abrirRanking: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
        var v = new RankingController();
        v.loadGlobalRank();
        v.loadPersonalRank();
    },
    abrirSurvey: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
        if (localStorage.getItem("username") != null && localStorage.getItem("username") != '' && localStorage.getItem("username") != undefined) {
            document.getElementById("label_3").textContent = localStorage.getItem("username");
        } else {
            window.location.href = 'index.html#login';
            return;
        }
        var v = new SurveyController();
        v.createEventListener();
    },
    abrirSurveyPostGame: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
        if (localStorage.getItem("username") != null && localStorage.getItem("username") != '' && localStorage.getItem("username") != undefined) {
            document.getElementById("label_3").textContent = localStorage.getItem("username");
        } else {
            window.location.href = 'index.html#login';
            return;
        }
        var v = new PostGameSurveyController();
        v.createEventListener();

    },
    abrirSurveyEmocional: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
        if (localStorage.getItem("username") != null && localStorage.getItem("username") != '' && localStorage.getItem("username") != undefined) {
            document.getElementById("label_3").textContent = localStorage.getItem("username");
        } else {
            window.location.href = 'index.html#login';
            return;
        }
        var v = new EmotionalSurveyController();
        splide = v.createEventListener();
    },
    abrirGame: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
        loadGame();
    },
    abrirChangePassword: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
        var v = new LoginController();
        v.createEventsChangePassword();
    },
    abrirIntroduccion: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
    },
    abrirPrivacidad: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
    },
    abrirAcercaDe: function() {
        let agradecimiento = document.getElementById("agradecimiento");
        agradecimiento.textContent = "";
        this.destroyGame();
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