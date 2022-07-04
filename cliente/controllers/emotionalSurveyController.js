class EmotionalSurveyController {

    createEventListener() {
        let btnSend = document.getElementById("btnSend");

        let thisController = this;
        btnSend.addEventListener('click', function(e) { thisController.submitEvent() }, false);

        this.splide = new Splide('.splide', {
            direction: 'ttb',
            height: '10rem',
            pagination: false,
            wheel: true,
        });

        this.splide.mount();
        return this.splide;
    }

    submitEvent() {
        let error = document.getElementById("error");
        let username = localStorage.getItem("username");
        if (username == undefined || username == "") {
            error.textContent = "Debe iniciar sesión";
            return
        } else {
            error.textContent = "";
        }
        this.newSurvey();
    }

    getMotivado(indexMotivado) {
        let motivado;
        switch (indexMotivado) {
            case 0:
                motivado = 10;
                break;
            case 1:
                motivado = 9;
                break;
            case 2:
                motivado = 8;
                break;
            case 3:
                motivado = 7;
                break;
            case 4:
                motivado = 6;
                break;
            case 5:
                motivado = 5;
                break;
            case 6:
                motivado = 4;
                break;
            case 7:
                motivado = 3;
                break;
            case 8:
                motivado = 2;
                break;
            case 9:
                motivado = 1;
                break;
        }
        return motivado;
    }
    getEmotion() {
        let emocion = false;
        let list = document.getElementsByName("emotion");
        for (let i = 0; i <= 6; i++) {
            if (list[i].checked) {
                emocion = this.checkEmotion(i);
                return emocion;
            }
        }
        return emocion;
    }
    checkEmotion(i) {
        switch (i) {
            case 0:
                return "enfermo";
            case 1:
                return "triste";
            case 2:
                return "asustado";
            case 3:
                return "enfadado";
            case 4:
                return "normal";
            case 5:
                return "sorprendido";
            case 6:
                return "feliz";
        }
    }

    newSurvey() {
        let error = document.getElementById("error");
        let username = localStorage.getItem("username");
        let emocion = this.getEmotion();
        let indexMotivado = splide.Components.Controller.getIndex();
        let motivado = this.getMotivado(indexMotivado)
        if (emocion == false) {
            error.textContent = "Selecciona una emoción";
            return
        } else {
            error.textContent = "";
        }
        let emotionalSurveyJSON = {
            "username": username,
            "emocion": emocion,
            "motivado": motivado,
            "puntuacion": puntuacionFinal
        };
        this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/emotionalSurvey/create', emotionalSurveyJSON);

    }

    checkAnswerOnSurvey(list) {
        let answer;
        for (var i = 0; i < list.length; i++) {
            if (list[i].checked) {
                break;
            }
        }
        switch (i) {
            case 0:
                answer = "muy malo-muy poco";
                break;
            case 1:
                answer = "malo-poco";
                break;
            case 2:
                answer = "regular";
                break;
            case 3:
                answer = "bueno-mucho";
                break;
            case 4:
                answer = "muy bueno-muchisimo";
                break;
            default:
                answer = "empty"
                break;
        }
        return answer;
    }

    buildRequest(rType, url, body) {
        let thisController = this;
        $.ajax({
            type: rType,
            url: url,
            dataType: "JSON",
            data: JSON.stringify(body),
            cache: false,
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Accept", "application/json");
            },
            success: function(result) {
                thisController.checkResponse(result);
                return result;

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("erro", jqXHR, textStatus, errorThrown);
            }
        });
    }
    checkResponse(res) {
        let error = document.getElementById("error");
        let message = document.getElementById("message");
        let type = res.type;
        switch (type) {
            case "create":
                window.location.href = 'index.html#ranking';
                break;
        }
        if (message != undefined) {
            if (res.msg != undefined) {
                message.textContent = res.msg;
                error.textContent = "";
            } else {
                error.textContent = res.error;
                message.textContent = "";
            }
        }

    }
}
var loadEmotionalSurveyController = function() {
    let emotionalSurveyController = new EmotionalSurveyController();
    return emotionalSurveyController.createEventListener();
}