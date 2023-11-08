window.addEventListener("load", function () {

    if ((window.location.pathname === '/validaAlumnos') || (window.location.pathname === '/creaPreguntas') || (window.location.pathname === '/creaExamen') || (window.location.pathname === '/test')) {
        document.getElementById("cerrarSesion").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/logout";
        });

        document.getElementById("pageBack").addEventListener("click", function () {
            window.history.back();
        });
    } else if (window.location.pathname === '/home') {
        document.getElementById("cerrarSesion").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/logout";
        });

        document.getElementById("examenInicial").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/testChooser?dif=1";
        });

        document.getElementById("examenMedia").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/testChooser?dif=2";
        });

        document.getElementById("examenAlta").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/testChooser?dif=3";
        });

        document.getElementById("examenCategoria").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/testChooser?cat=cat";
        });

        document.getElementById("creaPreguntas").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/creaPreguntas";
        });

        document.getElementById("creaExamenes").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/creaExamen";
        });

        document.getElementById("validaAlumnos").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/validaAlumnos";
        });
    } else if (window.location.pathname === '/testChooser') {
        var buttons = document.querySelectorAll(".enter");

        // Agrega un evento de clic a cada botón
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                var exId = this.getAttribute("data-exId");
                var usId = this.getAttribute("data-usId");
                window.location.href = "/test?exId="+exId+'&usId='+usId;
            });
        });

        document.getElementById("cerrarSesion").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/logout";
        });

        document.getElementById("pageBack").addEventListener("click", function () {
            window.history.back();
        });
    }

});