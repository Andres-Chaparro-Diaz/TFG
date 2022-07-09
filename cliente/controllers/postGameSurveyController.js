class PostGameSurveyController {

    createEventListener() {
        let btnSend = document.getElementById("btnSend");

        let thisController = this;
        btnSend.addEventListener('click', function(e) { thisController.submitEvent() }, false);
        //btnRegister.dispatchEvent(event);
        this.splide1 = new Splide('#OnePlayerDifficult', {
            perPage: 1,
            pagination: false,
            start: 4,
        });
        this.splide2 = new Splide('#TwoPlayerDifficult', {
            perPage: 1,
            pagination: false,
            start: 4,
        });
        this.splide3 = new Splide('#ThreePlayerDifficult', {
            perPage: 1,
            pagination: false,
            start: 4,
        });
        this.splide4 = new Splide('#FourPlayerDifficult', {
            perPage: 1,
            pagination: false,
            start: 4,
        });
        this.splide1.mount();
        this.splide2.mount();
        this.splide3.mount();
        this.splide4.mount();
        var splides = [];
        splides.push(this.splide1)
        splides.push(this.splide2)
        splides.push(this.splide3)
        splides.push(this.splide4)
        return splides;
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


    checkSplide(indexSplide) {
        let value;
        switch (indexSplide) {
            case 0:
                value = 1;
                break;
            case 1:
                value = 2;
                break;
            case 2:
                value = 3;
                break;
            case 3:
                value = 4;
                break;
            case 4:
                value = 5;
                break;
            case 5:
                value = 6;
                break;
            case 6:
                value = 7;
                break;
            case 7:
                value = 8;
                break;
            case 8:
                value = 9;
                break;
            case 9:
                value = 10;
                break;
        }
        return value;
    }


    newSurvey() {
        let error = document.getElementById("error");

        let username = localStorage.getItem("username");

        let gustadoList = document.getElementsByName("preguntas[0]");
        let jugarHabitualList = document.getElementsByName("preguntas[1]");
        let concentracionList = document.getElementsByName("preguntas[2]");
        let artisticoList = document.getElementsByName("preguntas[3]");
        let simpleList = document.getElementsByName("preguntas[4]");
        let onePlayerDifficult = this.checkSplide(splides[0].Components.Controller.getIndex());
        let twoPlayerDifficult = this.checkSplide(splides[1].Components.Controller.getIndex());;
        let threePlayerDifficult = this.checkSplide(splides[2].Components.Controller.getIndex());;
        let fourPlayerDifficult = this.checkSplide(splides[3].Components.Controller.getIndex());;

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
        this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/postGameSurvey/create', postGameSurveyJSON);

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
var loadPostGameSurveyController = function() {
    let posGamesurveycontrol = new PostGameSurveyController();
    return posGamesurveycontrol.createEventListener();
}