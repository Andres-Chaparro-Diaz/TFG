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
            const event = new Event('click');
            let tbUserName = document.getElementById("tbUsuario");
            let tbPwd = document.getElementById("tbPwd");

            let controller = this;
            btnLogin.addEventListener('click', function(e) {
                controller.login(tbUserName.textContent, tbPwd.textContent);
            }, false);
            //btnLogin.dispatchEvent(event);
        }
        createEventsRegister() {
            let btnLogin = document.getElementById("btnCrearCuenta");
            const event = new Event('click');
            let tbUserName = document.getElementById("tbUsuario");
            let tbPwd = document.getElementById("tbPwd");
            let tbPwd2 = document.getElementById("tbPwd2");

            let controller = this;
            btnLogin.addEventListener('click', function(e) { controller.newUser(tbUserName.textContent, tbPwd.textContent, tbPwd2.textContent) }, false);
            btnLogin.dispatchEvent(event);
        }
        newUser(userName, pwd, pwd2) {
            let users = this.readJSON();
            if ("comprobar si existe en la bbdd" == "") {
                user = new User(userName, pwd);
                userJSON = { "id143": { "userName": userName, "password": password, "topPosiciones": [] } };
                users = push(userJSON);
                this.writeJSON(users)
            } else {
                let error = document.getElementById("error");
                error.textContent = "El usuario ya existe";
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

        login(userName, password) {
            let users = this.readJSON();
            let message = document.getElementById("message");
            message.textContent = "El usuario no existe";
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
            request.open('POST', requestURL);
            request.responseType = 'json';
            request.send(JSON.stringify(users));
        }
    }
    let control = new controller();
    control.createEventsLogin();
    control.createEventsRegister();
}

userController()