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
            this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/user/getRecords', userJSON);
        }
    }

    showPersonalRank(records) {
        let tablePersonal = document.getElementById("personalRankTable");
        records.sort(function(a, b) { return b - a });
        for (var j = 0; j < records.length; j++) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.value = records[j];
            td.textContent = records[j];
            tr.appendChild(td)
            tablePersonal.appendChild(tr);
        }
    }

    loadGlobalRank() {
        let userLogged = localStorage.getItem("username");
        if (userLogged != "" || userLogged != null) {
            let userJSON = { 'username': userLogged };
            this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/user/getGlobalRecords', userJSON);

        }
    }

    showGlobalRank(globalRank) {
        let tableGlobal = document.getElementById("globalRankTable");
        let globalListUsers = [];
        for (var i in globalRank) {
            var key = i;
            let personalList = globalRank[i];
            personalList.sort(function(a, b) { return b - a });
            let user = { "username": key, "points": personalList[0] };
            globalListUsers.push(user);
        }
        globalListUsers.sort(function(a, b) {
            if (a.points == undefined) a.points = 0;
            if (b.points == undefined) b.points = 0;
            return b.points - a.points
        });
        for (var k = 0, users = 0; k < globalListUsers.length && users < 15; k++, users++) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let tdU = document.createElement("td");
            td.value = globalListUsers[k].points;
            td.textContent = globalListUsers[k].points;
            tdU.value = globalListUsers[k].username;
            tdU.textContent = globalListUsers[k].username;
            tr.appendChild(td);
            tr.appendChild(tdU);
            tableGlobal.appendChild(tr);
        }

    }
}
var loadRankingController = function() {
    let rankingController = new RankingController();
    rankingController.loadGlobalRank();
    rankingController.loadPersonalRank();
}