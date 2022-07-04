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
            new Route('privacidad', 'politica.html'),
            new Route('changePassword', 'changePassword.html'),

            new Route('cuestionario', 'cuestionario.html'),
            new Route('postcuestionario', 'postCuestionario.html'),
            new Route('cuestionarioemocional', 'cuestionarioEmociones.html')

        ]);
    }
    init();
}());