window.addEventListener("load", function () {
    if (window.location.pathname === '/') {
        // Obtén referencias a los elementos del DOM
        const abrirModal = document.getElementById("abrirModal");
        const modal = document.getElementById("miModal");
        const cerrarModal = document.getElementById("cerrarModal");
        const contenido = document.getElementById('modal-contenido');
        var divContent = document.getElementById('content')

        // Mostrar el modal
        abrirModal.addEventListener("click", function (ev) {
            ev.preventDefault();
            modal.style.display = "block";
            fondoOscurecido.style.display = "block";
            fetch("https://localhost:8000/register")
                .then(x => x.text())
                .then(y => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(y, 'text/html');

                    const bodyContent = doc.body.innerHTML;
                    divContent.innerHTML = bodyContent;
                    contenido.appendChild(divContent);
                });
        });

        // Ocultar el modal
        cerrarModal.addEventListener("click", function () {
            modal.style.display = "none";
            fondoOscurecido.style.display = "none";
        });
    }
});