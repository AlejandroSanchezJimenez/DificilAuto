window.addEventListener("load", function () {

    if ((window.location.pathname === '/validaAlumnos') || (window.location.pathname === '/creaPreguntas') || (window.location.pathname === '/creaExamen')) {
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
    
        document.getElementById("examenInicial").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/";
        });
    
        document.getElementById("examenMedia").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/";
        });
    
        document.getElementById("examenAlta").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/";
        });
    
        document.getElementById("examenCategoria").addEventListener("click", function () {
            // Redireccionar a la URL "/logout"
            window.location.href = "/";
        });
    }

    

});