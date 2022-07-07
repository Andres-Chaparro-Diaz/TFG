class RegisterController {

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
            pwd = CryptoJS.AES.encrypt(pwd, 'public_key').toString();
            pwd2 = null;
            let userJSON = { "username": username, "password": pwd, "topPosiciones": [], "email": email };
            this.buildRequest('post', 'https://andres-tfg-backend.herokuapp.com/user/register', userJSON);

        } else {
            message.textContent = "";
            error.textContent = "Las contraseñas no coinciden";
        }
    }

    buildRequest(rType, url, body) {
        let thisController = this;

        $.ajax({
            type: rType,
            url: url,
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Accept", "application/json");
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
            case "register":
                if (res.msg != undefined) {
                    localStorage.setItem("username", res.username)
                    window.location.href = 'index.html#cuestionario';
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
}

var loadRegisterController = function() {
    let registerController = new RegisterController();
    registerController.createEventsRegister();
}