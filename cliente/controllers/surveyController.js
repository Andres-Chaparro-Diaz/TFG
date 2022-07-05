class SurveyController {

    createEventListener() {
        let btnSend = document.getElementById("btnSend");

        let thisController = this;
        btnSend.addEventListener('click', function(e) { thisController.submitEvent() }, false);
        //btnRegister.dispatchEvent(event);
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



    newSurvey() {
        let error = document.getElementById("error");

        let username = localStorage.getItem("username");
        let edad = document.getElementById("input_5").value;
        let cuantoJuegasList = document.getElementsByName("preguntas[0]");
        let nivelJugandoList = document.getElementsByName("preguntas[1]")
        let variasCosasALaVezList = document.getElementsByName("preguntas[2]")
        let participa = document.getElementById("cbox1").checked;

        let cuantoJuegasAnswer = this.checkAnswerOnSurvey(cuantoJuegasList);
        let nivelJugandoAnswer = this.checkAnswerOnSurvey(nivelJugandoList);
        let variasCosasALaVezAnswer = this.checkAnswerOnSurvey(variasCosasALaVezList);


        if ((edad == "") || cuantoJuegasAnswer == "empty" || nivelJugandoAnswer == "empty" || variasCosasALaVezAnswer == "empty") {
            error.textContent = "Responda todas las preguntas";
            return;
        }

        if (isNaN(edad)) {
            error.textContent = "Escriba una valor válido";
            return;
        }
        let surveyJSON = { "username": username, "edad": edad, "cuantoJuegasAnswer": cuantoJuegasAnswer, "nivelJugandoAnswer": nivelJugandoAnswer, "variasCosasALaVezAnswer": variasCosasALaVezAnswer, "participa": participa };
        this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/survey/create', surveyJSON);

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
                answer = "Totalmente desacuerdo";
                break;
            case 1:
                answer = "Desacuerdo";
                break;
            case 2:
                answer = "Ni de acuerdo ni desacuerdo";
                break;
            case 3:
                answer = "De acuerdo";
                break;
            case 4:
                answer = "Totalmente de acuerdo";
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
                console.log("error server not found", jqXHR, textStatus, errorThrown);
                //reject()
            }
        });
    }
    checkResponse(res) {
        let error = document.getElementById("error");
        let message = document.getElementById("message");
        let type = res.type;
        switch (type) {
            case "create":
                window.location.href = 'index.html#introduccion';
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

var loadSurveyController = function() {
    let surveycontrol = new SurveyController();
    surveycontrol.createEventListener();
}