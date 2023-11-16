window.addEventListener("load", function () { // redireccionado de todas las páginas desde js 

    if ((window.location.pathname === '/validaAlumnos') || (window.location.pathname === '/creaPreguntas') || (window.location.pathname === '/creaExamen') || (window.location.pathname === '/test')) {
        document.getElementById("cerrarSesion").addEventListener("click", function () {
            window.location.href = "/logout";
        });

        document.getElementById("pageBack").addEventListener("click", function () {
            window.history.back();
        });
    } else if (window.location.pathname === '/home') {
        document.getElementById("cerrarSesion").addEventListener("click", function () {
            window.location.href = "/logout";
        });

        document.getElementById("examenInicial").addEventListener("click", function () {
            window.location.href = "/testChooser?dif=1";
        });

        document.getElementById("examenMedia").addEventListener("click", function () {
            window.location.href = "/testChooser?dif=2";
        });

        document.getElementById("examenAlta").addEventListener("click", function () {
            window.location.href = "/testChooser?dif=3";
        });

        document.getElementById("examenCategoria").addEventListener("click", function () {
            window.location.href = "/testChooser?cat=cat";
        });

        if (!document.getElementById('roltag').textContent.includes('ROLE_USER')) {
            document.getElementById("creaPreguntas").addEventListener("click", function () {
                window.location.href = "/creaPreguntas";
            });

            document.getElementById("creaExamenes").addEventListener("click", function () {
                window.location.href = "/creaExamen";
            });

            document.getElementById("validaAlumnos").addEventListener("click", function () {
                window.location.href = "/validaAlumnos";
            });
        }
    } else if (window.location.pathname === '/testChooser') {
        var buttons = document.querySelectorAll(".enter");

        buttons.forEach(function (button) {
            button.addEventListener("click", function () { // obtengo parametros como get
                var exId = this.getAttribute("data-exId");
                var usId = this.getAttribute("data-usId");
                window.location.href = "/test?exId=" + exId + '&usId=' + usId;
            });
        });

        var buttonsCheck = document.querySelectorAll(".check");

        buttonsCheck.forEach(function (button) {
            button.addEventListener("click", function () { // obtengo parametros como get
                var exId = this.getAttribute("data-exId");
                var usId = this.getAttribute("data-usId");
                window.location.href = "/checkTest?exId=" + exId + '&usId=' + usId;
            });
        });

        document.getElementById("cerrarSesion").addEventListener("click", function () {
            window.location.href = "/logout";
        });

        document.getElementById("pageBack").addEventListener("click", function () {
            window.history.back();
        });
    } else if (window.location.pathname === '/checkTest') {
        var buttonsCheck = document.querySelectorAll(".check");

        buttonsCheck.forEach(function (button) {
            button.addEventListener("click", function () { // obtengo parametros como get
                var inId = this.getAttribute("data-inId");
                var exId = this.getAttribute('data-exid');
                window.location.href = "/test?inId=" + inId + '&exId=' + exId;
            });
        });

        document.getElementById("cerrarSesion").addEventListener("click", function () {
            window.location.href = "/logout";
        });

        document.getElementById("pageBack").addEventListener("click", function () {
            window.history.back();
        });
    }

});