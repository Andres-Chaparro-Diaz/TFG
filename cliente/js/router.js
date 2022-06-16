'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function() {
        var r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', function(e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r) {
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }


    },
    goToRoute: function(htmlName) {
        (function(scope) {


            new Promise(function(resolve, reject) {
                var url = '/views/' + htmlName,
                    xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        scope.rootElem.innerHTML = this.responseText;
                    }
                };
                xhttp.open('GET', url, false);
                xhttp.send();
                resolve();
            }).then(function() {
                switch (window.location.hash.substr(1)) {
                    case "introduccion":
                        break;
                    case "login":
                        app.abrirLogin()
                        break
                    case "register":
                        app.abrirRegister()
                        break
                    case "cuestionario":
                        app.abrirSurvey()
                        break;
                    case "postcuestionario":
                        app.abrirSurveyPostGame()
                        break;
                    case "main":
                        app.abrirGame()
                        break;
                    case "ranking":
                        app.abrirRanking()
                        break;
                    case "changePassword":
                        app.abrirChangePassword()
                        break;
                    case "cuestionarioemocional":
                        app.abrirSurveyEmocional()
                        break;
                    case "privacidad":
                        break;
                    case "about":
                        break;

                }
            });

        })(this);
    }
};