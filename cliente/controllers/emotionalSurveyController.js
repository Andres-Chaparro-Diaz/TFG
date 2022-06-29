class EmotionalSurveyController {

    createEventListener() {
        let btnSend = document.getElementById("btnSend");

        let thisController = this;
        btnSend.addEventListener('click', function(e) { thisController.submitEvent() }, false);

        this.splide = new Splide('.splide', {
            type: 'loop',
            perpage: '3'

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

    getEmocion(indexEmocion) {
        let emocion;
        switch (indexEmocion) {
            case 0:
                emocion = "enfermo";
                break;
            case 1:
                emocion = "triste";
                break;
            case 2:
                emocion = "asustado";
                break;
            case 3:
                emocion = "enfadado";
                break;
            case 4:
                emocion = "normal";
                break;
            case 5:
                emocion = "sorprendido";
                break;
            case 6:
                emocion = "feliz";
                break;
        }
        return emocion;
    }


    newSurvey() {
        let error = document.getElementById("error");

        let username = localStorage.getItem("username");
        let motivado = document.getElementById("motivado").value;
        let indexEmocion = splide.Components.Controller.getIndex();
        let emocion = this.getEmocion(indexEmocion)

        let emotionalSurveyJSON = {
            "username": username,
            "emocion": emocion,
            "motivado": motivado
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