window.addEventListener("load", function () {
    if (window.location.pathname === '/') { // declaro las variables a utilizar
        const abrirModal = document.getElementById("abrirModal");
        const modal = document.getElementById("miModal");
        const cerrarModal = document.getElementById("cerrarModal");
        const contenido = document.getElementById('modal-contenido');
        var divContent = document.getElementById('content')

        abrirModal.addEventListener("click", function (ev) { // abro el modal trayendome la plantilla de registro
            ev.preventDefault();
            modal.style.display = "block";
            fondoOscurecido.style.display = "block";
            fetch("https://localhost:8000/register") // fetch get de registro
                .then(x => x.text())
                .then(y => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(y, 'text/html');

                    const bodyContent = doc.body.innerHTML;
                    divContent.innerHTML = bodyContent;
                    contenido.appendChild(divContent);
                });
        });

        cerrarModal.addEventListener("click", function () { // cierro el modal
            modal.style.display = "none";
            fondoOscurecido.style.display = "none";
        });
    }
});