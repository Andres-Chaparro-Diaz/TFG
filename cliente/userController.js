class Controller {
    createEventsLogin() {
        //falta controlar excepciones 
        let btnLogin = document.getElementById("entrar");
        let linkChangePwd = document.getElementById("changePwd")

        let thisController = this;
        btnLogin.addEventListener('click', function(e) {
            thisController.login();
        }, false);

        linkChangePwd.addEventListener('click', function(e) {
            thisController.sendMail();
        }, false);
        //btnLogin.dispatchEvent(event);
    }

    createEventsRegister() {
        let btnRegister = document.getElementById("btnCrearCuenta");

        let thisController = this;
        btnRegister.addEventListener('click', function(e) { thisController.newUser() }, false);
        //btnRegister.dispatchEvent(event);
    }

    newUser() {
        let error = document.getElementById("error");
        let message = document.getElementById("message");

        let username = document.getElementById("tbUsuario").value;
        let pwd = document.getElementById("tbPwd").value;
        let pwd2 = document.getElementById("tbPwd2").value;
        let email = document.getElementById("tbEmail").value;

        let exist = false;
        if (username == "" || email == "" || pwd == "" || pwd2 == "") {
            error.textContent = "Rellene los campos";
            return;
        }
        if (pwd == pwd2) {
            let userJSON = { "username": username, "password": pwd, "topPosiciones": [], "email": email };
            this.buildRequest('post', 'http://localhost:3000/user/register', userJSON);

        } else {
            message.textContent = "";
            error.textContent = "Las contraseñas no coinciden";
        }
    }
    sendPoints() {
        let username = sessionStorage.getItem("username");
        if (username == undefined || username == "") {
            return
        }
        let spPoints = document.getElementById("spPuntuacion");
        let points = spPoints.textContent;
        let userJSON = { "username": username, "points": points };
        this.buildRequest('post', 'http://localhost:3000/user/addRecord', userJSON);
    }

    sendMail() {

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
            case "login":
                if (res.msg != undefined) {
                    sessionStorage.setItem("username", res.username)
                    window.location.href = 'introduccion.html';
                }
                break;
            case "newRecord":
                window.location.href = 'ranking.html';
                break;
            case "register":
                window.location.href = 'introduccion.html';
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

    login() {
        let error = document.getElementById("error");
        let message = document.getElementById("message");
        let username = document.getElementById("tbUsuario").value;
        let password = document.getElementById("tbPwd").value;
        let userJSON = { 'username': username, 'password': password };

        if (username == "" || password == "") {
            message.textContent = "";
            error.textContent = "Rellene los campos";
        } else {
            this.buildRequest('post', 'http://localhost:3000/user/login', userJSON);

        }
    }

    /*changePassword(password, newPassword, userName) {
        let users = this.readJSON();
        if ("existe el usuario en la bbdd" == userName) {

            userJSON = { "id143": { "username": userName, "password": newPassword, "topPosiciones": [] } };
            users.push(userJSON);
            this.writeJSON(users)
        } else {
            let error = document.getElementById("error");
            error.textContent = "El usuario no existe";
        }
    }*/

    loadPersonalRank() {
        let userLogged = sessionStorage.getItem("username");
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
            div.className = "liDiv"; //esto falta utilizarlo y ponerle los estilos
            div1.appendChild(p);
            div.appendChild(div1);
            li.appendChild(div)
            ulPP.appendChild(li);
        }
    }

    loadGlobalRank() {
        let userLogged = sessionStorage.getItem("username");
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
        for (var i = 0; i < globalListPoints.length; i++) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            let div1 = document.createElement("div");
            let p = document.createElement("p");
            p.value = globalListPoints[i];
            p.textContent = globalListPoints[i];
            div.className = "liDiv"; //esto falta utilizarlo y ponerle los estilos
            div1.appendChild(p);
            div.appendChild(div1);
            li.appendChild(div)
            ulGP.appendChild(li);
            for (var j = 0; j < globalListUsers.length; j++) {
                if (globalListUsers[j].points != 0) {
                    if (globalListPoints[i] == globalListUsers[j].points) {
                        let liU = document.createElement("li");
                        let divU = document.createElement("div");
                        let divU1 = document.createElement("div");
                        let pU = document.createElement("p");
                        pU.value = globalListUsers[j].username;
                        pU.textContent = globalListUsers[j].username;
                        globalListUsers[j].username = "";
                        globalListUsers[j].points = 0;
                        div.className = "liDiv"; //esto falta utilizarlo y ponerle los estilos
                        divU1.appendChild(pU);
                        divU.appendChild(divU1);
                        liU.appendChild(divU)
                        ulGU.appendChild(liU);
                    }
                }
            }
        }

    }
}

let control = new Controller();
if (document.location.href == 'http://localhost/phaser/tutorial/TFG/cliente/register.html') {
    control.createEventsRegister();

} else if (document.location.href == 'http://localhost/phaser/tutorial/TFG/cliente/login.html') {
    control.createEventsLogin();
} else if (document.location.href == 'http://localhost/phaser/tutorial/TFG/cliente/ranking.html') {
    control.loadGlobalRank();
    control.loadPersonalRank();
}