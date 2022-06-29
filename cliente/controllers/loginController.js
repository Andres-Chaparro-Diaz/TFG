class LoginController {

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

    createEventsChangePassword() {
        let btnChangePassword = document.getElementById("btnCambiarPass");

        let thisController = this;
        btnChangePassword.addEventListener('click', function(e) { thisController.changePassword() }, false);
    }


    sendMail() {
        let error = document.getElementById("error");
        let username = document.getElementById("tbUsuario").value;
        if (username == undefined || username == "") {
            error.textContent = "Debe escribir su nombre de usuario primero";
            return;
        }
        let userJSON = { 'username': username };
        this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/user/sendEmail', userJSON);
    }

    buildRequest(rType, url, body) {
        let thisController = this;

        let config;
        $.ajax({
            url: '/controllers/configRequest.json',
            async: false,
            dataType: 'json',
            success: function(response) {
                config = response;
            }
        });

        $.ajax({
            type: rType,
            url: url,
            crossDomain: true,
            crossorigin: "anonymous",
            "Access-Control-Allow-Origin": config.origin,
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader(config.originH, config.origin);
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Accept", "application/json");
                xhrObj.setRequestHeader("crossorigin", "anonymous");
            },
            xhrFields: {
                "Access-Control-Allow-Origin": config.origin,
                crossorigin: "anonymous"
            },
            dataType: "JSON",
            data: JSON.stringify(body),
            cache: false,
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
                    localStorage.setItem("username", res.username)
                    window.location.href = 'index.html#introduccion';
                    userController.checkUserLogged();
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

    changePassword() {
        let error = document.getElementById("error");
        let message = document.getElementById("message");

        let username = document.getElementById("tbUsuario").value;
        let pwd = document.getElementById("tbPwd").value;
        let pwd2 = document.getElementById("tbPwd2").value;
        let codigo = document.getElementById("tbCodigo").value;

        if (username == "" || pwd == "" || pwd2 == "" || codigo == "") {
            error.textContent = "Rellene todos los campos";
            return;
        }
        if (pwd == pwd2) {
            pwd = CryptoJS.AES.encrypt(pwd, 'public_key').toString();
            let userJSON = { "username": username, "password": pwd, "codigo": codigo };
            this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/user/changePassword', userJSON);

        } else {
            message.textContent = "";
            error.textContent = "Las contraseñas no coinciden";
        }
    }

    login() {
        let error = document.getElementById("error");
        let message = document.getElementById("message");
        let username = document.getElementById("tbUsuario").value;
        let password = document.getElementById("tbPwd").value;



        if (username == "" || password == "") {
            message.textContent = "";
            error.textContent = "Rellene los campos";
        } else {
            password = CryptoJS.AES.encrypt(password, 'public_key').toString();
            let userJSON = { 'username': username, 'password': password };
            this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/user/login', userJSON);

        }
    }

}
var loadLoginController = function() {
    let loginController = new LoginController();
    loginController.createEventsLogin();
}