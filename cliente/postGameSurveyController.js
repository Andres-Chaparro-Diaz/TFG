class PostGameSurveyController {

    createEventListener() {
        let btnSend = document.getElementById("btnSend");

        let thisController = this;
        btnSend.addEventListener('click', function(e) { thisController.submitEvent() }, false);
        //btnRegister.dispatchEvent(event);
    }

    submitEvent() {
        let error = document.getElementById("error");

        let username = sessionStorage.getItem("username");
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

        let username = sessionStorage.getItem("username");

        let gustadoList = document.getElementsByName("preguntas[0]");
        let jugarHabitualList = document.getElementsByName("preguntas[1]");
        let concentracionList = document.getElementsByName("preguntas[2]");
        let artisticoList = document.getElementsByName("preguntas[3]");
        let simpleList = document.getElementsByName("preguntas[4]");

        let onePlayerDifficult = document.getElementById("OnePlayerDifficult").value;
        let twoPlayerDifficult = document.getElementById("TwoPlayerDifficult").value;
        let threePlayerDifficult = document.getElementById("ThreePlayerDifficult").value;
        let fourPlayerDifficult = document.getElementById("FourPlayerDifficult").value;

        let improvements = document.getElementById("input_improvements").value

        let gustadoAnswer = this.checkAnswerOnSurvey(gustadoList);
        let jugarHabitualAnswer = this.checkAnswerOnSurvey(jugarHabitualList);
        let concentracionAnswer = this.checkAnswerOnSurvey(concentracionList);
        let artisticoAnswer = this.checkAnswerOnSurvey(artisticoList);
        let simpleAnswer = this.checkAnswerOnSurvey(simpleList);


        if (gustadoAnswer == "empty" || jugarHabitualAnswer == "empty" || concentracionAnswer == "empty" || artisticoAnswer == "empty" || simpleAnswer == "empty") {
            error.textContent = "Responda todas las preguntas";
            return;
        }

        let postGameSurveyJSON = {
            "username": username,
            "gustadoAnswer": gustadoAnswer,
            "jugarHabitualAnswer": jugarHabitualAnswer,
            "concentracionAnswer": concentracionAnswer,
            "artisticoAnswer": artisticoAnswer,
            "simpleAnswer": simpleAnswer,
            "onePlayerDifficult": onePlayerDifficult,
            "twoPlayerDifficult": twoPlayerDifficult,
            "threePlayerDifficult": threePlayerDifficult,
            "fourPlayerDifficult": fourPlayerDifficult,
            "improvements": improvements,
        };
        this.buildRequest('post', 'http://localhost:3000/postGameSurvey/create', postGameSurveyJSON);

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
                console.log("erro register", jqXHR, textStatus, errorThrown);
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
                window.location.href = 'introduccion.html';
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

let posGamesurveycontrol = new PostGameSurveyController();
posGamesurveycontrol.createEventListener();