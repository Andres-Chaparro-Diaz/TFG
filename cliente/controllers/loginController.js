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


    sendMail() {
        let userJSON = { 'username': username };
        this.buildRequest('post', 'http://localhost:3000/user/changePassword', userJSON);
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

}
var loadLoginController = function() {
    let loginController = new LoginController();
    loginController.createEventsLogin();
}