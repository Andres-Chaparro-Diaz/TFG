function userController() {
    class User {
        constructor(userName, password) {
            this.userName = userName;
            this.password = password;
            this.id = "id ahi to guapo seria lo suyo con UUID";
            this.topPuntuaciones = [];
        }

        addPuntuacion(puntuacion) {
            if (this.topPuntuaciones.length == 0) {
                this.topPuntuaciones.push(puntuacion);
            }
            for (var i = 0; i < this.topPuntuaciones.length; i++) {
                if (puntuacion > this.topPuntuaciones[i]) {
                    this.topPuntuaciones[i] = puntuacion;
                }
            }
        }

        getTopPuntuaciones() {
            return this.topPuntuaciones;
        }
        getUsername() {
            return this.user;
        }

        getUsername() {
            return this.password;
        }

        setUser(userName) {
            this.userName = userName;
        }

        setPassword(password) {
            this.password = password;
        }

        setPassword(password) {
            this.password = password;
        }
    }

    class controller {
        createEventsLogin() {
            //falta controlar excepciones 
            let btnLogin = document.getElementById("entrar");

            let controller = this;
            btnLogin.addEventListener('click', function(e) {
                controller.login();
            }, false);
            //btnLogin.dispatchEvent(event);
        }

        createEventsRegister() {
            let btnRegister = document.getElementById("btnCrearCuenta");

            let controller = this;
            btnRegister.addEventListener('click', function(e) { controller.newUser() }, false);
            //btnRegister.dispatchEvent(event);
        }

        newUser() {
            let error = document.getElementById("error");
            let message = document.getElementById("message");
            let tbUserName = document.getElementById("tbUsuario");
            let tbPwd = document.getElementById("tbPwd");
            let tbPwd2 = document.getElementById("tbPwd2");

            let users = this.readJSON();
            let userName = tbUserName.value;
            let pwd = tbPwd.value;
            let pwd2 = tbPwd2.value;

            let exist = false;
            if (userName == "" || pwd == "" || pwd2 == "") {
                error.textContent = "Rellene los campos";
                return;
            }
            for (var i = 0; i < users.length; i++) {
                if (users[i].userName.toLowerCase() == userName.toLowerCase()) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                if (pwd == pwd2) {
                    let userJSON = { "userName": userName, "password": pwd, "topPosiciones": [] };
                    users.push(userJSON);
                    this.writeJSON(users);
                    message.textContent = "El usuario ha sido registrado";
                    error.textContent = "";

                } else {
                    message.textContent = "";
                    error.textContent = "Las contraseñas no coinciden";
                }

            } else {
                message.textContent = "";
                error.textContent = "El usuario ya existe";
            }
        }

        login() {
            let error = document.getElementById("error");
            let message = document.getElementById("message");
            let tbUserName = document.getElementById("tbUsuario");
            let tbPwd = document.getElementById("tbPwd");

            let users = this.readJSON();
            let userName = tbUserName.value;
            let password = tbPwd.value;

            var found = false;

            if (userName != "") {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].userName.toLowerCase() == userName.toLowerCase()) {
                        found = true;
                        if (users[i].password == password) {
                            error.textContent = "";
                            message.textContent = "Credenciales válidas"
                        } else {
                            message.textContent = "";
                            error.textContent = "Contraseña incorrecta";
                        }
                    }
                }
                if (!found) {
                    message.textContent = "";
                    error.textContent = "Usuario no encontrado";
                }
            } else {
                message.textContent = "";
                error.textContent = "Rellene los campos";
            }
        }

        changePassword(password, newPassword, userName) {
            let users = this.readJSON();
            if ("existe el usuario en la bbdd" == userName) {

                userJSON = { "id143": { "userName": userName, "password": newPassword, "topPosiciones": [] } };
                users.push(userJSON);
                this.writeJSON(users)
            } else {
                let error = document.getElementById("error");
                error.textContent = "El usuario no existe";
            }
        }
        loadPersonalRank() {
            let userLogged = sessionStorage.getItem("userName");
            if (userLogged != "" || userLogged != null) {
                let users = this.readJSON();
                let ulPP = document.getElementById("ulPersonalPoints");
                for (var i = 0; i < users.length; i++) {
                    if (users[i].userName.toLowerCase() == userLogged.toLowerCase()) {
                        found = true;
                        let pointList = users[i].topPuntuaciones;
                        pointList.sort(function(a, b) { return b - a });
                        for (var j = 0; j < pointList.length; j++) {
                            let li = document.createElement("li");
                            let div = document.createElement("div");
                            let div1 = document.createElement("div");
                            let p = document.createElement("p");
                            p.value = pointList[j];
                            p.textContent = pointList[j];
                            div.className = "liDiv"; //esto falta utilizarlo y ponerle los estilos
                            div1.appendChild(p);
                            div.appendChild(div1);
                            li.appendChild(div)
                            ulPP.appendChild(li);
                        }
                    }
                }
            }
        }

        loadGlobalRank() {
            let users = this.readJSON();
            let ulGP = document.getElementById("ulGlobalPoints");
            let ulGU = document.getElementById("ulGlobalUsers");
            let globalListPoints = [];
            let globalListUsers = [];
            for (var i = 0; i < users.length; i++) {
                let personalList = users[i].topPuntuaciones;
                personalList.sort(function(a, b) { return b - a });
                globalListPoints.push(personalList[0]);
                let user = { "userName": users[i].userName, "points": personalList[0] };
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
                    // si hay 2 puntuaciones iguales la liamos aqui eh
                    if (globalListUsers[j].points != 0) {
                        if (globalListPoints[i] == globalListUsers[j].points) {
                            let liU = document.createElement("li");
                            let divU = document.createElement("div");
                            let divU1 = document.createElement("div");
                            let pU = document.createElement("p");
                            pU.value = globalListUsers[j].userName;
                            pU.textContent = globalListUsers[j].userName;
                            globalListUsers[j].userName = "";
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

        readJSON() {
            const requestURL = 'http://localhost/phaser/tutorial/TFG/users.json';
            const request = new XMLHttpRequest();
            request.open('GET', requestURL, false);
            let users;
            request.onload = function() {
                users = request.response;
            }
            request.send();
            return JSON.parse(users);

        }
        writeJSON(users) {
            const requestURL = 'http://localhost/phaser/tutorial/TFG/users.json';
            const request = new XMLHttpRequest();
            request.open('POST', requestURL, false);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(JSON.stringify(users));
        }
    }
    let control = new controller();
    if (document.location.href == 'http://localhost/phaser/tutorial/TFG/register.html') {
        control.createEventsRegister();

    } else if (document.location.href == 'http://localhost/phaser/tutorial/TFG/login.html') {
        control.createEventsLogin();
    } else if (document.location.href == 'http://localhost/phaser/tutorial/TFG/ranking.html') {
        control.loadGlobalRank();
        control.loadPersonalRank();
    }
}

userController()