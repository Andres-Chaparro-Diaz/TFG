'use strict';

(function() {
    function init() {
        var router = new Router([
            new Route('introduccion', 'introduccion.html', true),
            new Route('login', 'login.html'),
            new Route('register', 'register.html'),
            new Route('main', 'main.html'),
            new Route('ranking', 'ranking.html'),

            new Route('about', 'about.html'),

            new Route('cuestionario', 'cuestionario.html'),
            new Route('postcuestionario', 'postcuestionario.html')

        ]);
    }
    init();
}());