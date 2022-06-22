class RankingController {

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
            case "newRecord":
                window.location.href = 'index.html#ranking';
                break;
            case "getRecords":
                if (res.personalRank != undefined) {
                    this.showPersonalRank(res.personalRank);
                }
                break;
            case "getGlobalRecords":
                if (res.globalRank != undefined) {
                    this.showGlobalRank(res.globalRank);
                }
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

    loadPersonalRank() {
        let userLogged = localStorage.getItem("username");
        if (userLogged != "" || userLogged != null) {
            let userJSON = { 'username': userLogged };
            this.buildRequest('post', 'http://localhost:3000/user/getRecords', userJSON);
        }
    }

    showPersonalRank(records) {
        let ulPP = document.getElementById("ulPersonalPoints");
        records.sort(function(a, b) { return b - a });
        for (var j = 0; j < records.length; j++) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            let div1 = document.createElement("div");
            let p = document.createElement("p");
            p.value = records[j];
            p.textContent = records[j];
            p.className = "pFila"
            div.className = "liDiv"; //esto falta utilizarlo y ponerle los estilos
            div1.appendChild(p);
            div.appendChild(div1);
            li.appendChild(div)
            ulPP.appendChild(li);
        }
    }

    loadGlobalRank() {
        let userLogged = localStorage.getItem("username");
        if (userLogged != "" || userLogged != null) {
            let userJSON = { 'username': userLogged };
            this.buildRequest('post', 'http://localhost:3000/user/getGlobalRecords', userJSON);

        }
    }

    showGlobalRank(globalRank) {
        let ulGP = document.getElementById("ulGlobalPoints");
        let ulGU = document.getElementById("ulGlobalUsers");
        let globalListPoints = [];
        let globalListUsers = [];
        for (var i in globalRank) {
            var key = i;
            let personalList = globalRank[i];
            personalList.sort(function(a, b) { return b - a });
            globalListPoints.push(personalList[0]);
            let user = { "username": key, "points": personalList[0] };
            globalListUsers.push(user);
        }

        globalListPoints.sort(function(a, b) { return b - a });
        for (var k = 0; k < globalListPoints.length; k++) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            let div1 = document.createElement("div");
            let p = document.createElement("p");
            p.value = globalListPoints[k];
            p.className = "pFila"
            p.textContent = globalListPoints[k];
            div.className = "liDiv"; //esto falta utilizarlo y ponerle los estilos
            for (var j = 0; j < globalListUsers.length; j++) {
                if (globalListUsers[j].points != 0) {
                    if (globalListPoints[k] == globalListUsers[j].points) {
                        let liU = document.createElement("li");
                        let divU = document.createElement("div");
                        let divU1 = document.createElement("div");
                        let pU = document.createElement("p");
                        pU.value = globalListUsers[j].username;
                        pU.textContent = globalListUsers[j].username;
                        pU.className = "pFila"
                        globalListUsers[j].username = "";
                        globalListUsers[j].points = 0;
                        divU.className = "liDiv"; //esto falta utilizarlo y ponerle los estilos
                        divU1.appendChild(pU);
                        divU.appendChild(divU1);
                        liU.appendChild(divU)
                        ulGU.appendChild(liU);
                    }
                }
            }
            div1.appendChild(p);
            div.appendChild(div1);
            li.appendChild(div)
            ulGP.appendChild(li);
        }

    }
}
var loadRankingController = function() {
    let rankingController = new RankingController();
    rankingController.loadGlobalRank();
    rankingController.loadPersonalRank();
}