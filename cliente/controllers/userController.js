class UserController {

    createEventListener() {
        let btnLogoout = document.getElementById("linkLogout");

        let thisController = this;
        btnLogoout.addEventListener('click', function(e) { thisController.logoutEvent() }, false);
        //btnRegister.dispatchEvent(event);
    }

    logoutEvent() {
        localStorage.setItem("username", "");
        let navLogin = document.getElementById("login")
        let navLogged = document.getElementById("logged")
        navLogged.style.display = "none"
        navLogged.style.overflow = "auto!important"
        navLogin.style.overflow = "hidden"
        navLogin.style.display = "block"
        window.location.href = 'index.html#login';
    }

    sendPoints() {
        let username = localStorage.getItem("username");
        if (username == undefined || username == "") {
            window.location.href = 'index.html#register';
        } else {
            let spPoints = document.getElementById("spPuntuacion");
            let points = spPoints.textContent;
            let userJSON = { "username": username, "points": points };
            this.buildRequest('post', 'http://localhost:3000/user/addRecord', userJSON);
        }

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

    checkUserLogged() {
        let username = localStorage.getItem("username");
        if (username != undefined && username != "") {
            let userJSON = { "username": username };
            this.buildRequest('post', 'http://localhost:3000/user/checkUser', userJSON);

        }
    }

    changeNavMenuLogged() {
        let navLogin = document.getElementById("login")
        let navLogged = document.getElementById("logged")
        document.getElementById("liUsername").textContent = localStorage.getItem("username");
        navLogin.style.display = "none"
        navLogin.style.overflow = "auto!important"
        navLogged.style.overflow = "hidden"
        navLogged.style.display = "block"
    }

    checkResponse(res) {
        let error = document.getElementById("error");
        let message = document.getElementById("message");
        let type = res.type;
        switch (type) {
            case "newRecord":
                if (res.participa) {
                    if (res.done) {
                        window.location.href = 'index.html#cuestionarioemocional'
                    } else {
                        window.location.href = 'index.html#postcuestionario';
                    }
                }
            case "checkUser":
                if (res.msg != undefined && res.msg != "") {
                    this.changeNavMenuLogged();
                }
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

let userController = new UserController();
userController.checkUserLogged();
userController.createEventListener();