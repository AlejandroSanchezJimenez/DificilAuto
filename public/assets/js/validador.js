window.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === '/validaAlumnos') { // declaro las variables a utilizar
        const acceptButtons = document.querySelectorAll('.accept');
        const cancelButtons = document.querySelectorAll('.cancel');

        acceptButtons.forEach(button => { // cada vez que pulse el boton accept obtengo el rol seleccionado y el usuario a cambiar 
            button.addEventListener('click', (ev) => {
                ev.preventDefault();

                const id = button.dataset.id;
                var combo = button.nextElementSibling;
                var selected = combo.options[combo.selectedIndex].text;
                var roles = [selected];
                const updatedUserData = {
                    rol: roles,
                    isVerified: true
                };

                fetch("https://localhost:8000/usuario/api/editar/" + id, { // hago el update
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUserData),
                })
                    .then(x => x.json())
                    .then(data => {
                        alert('Usuario aceptado con éxito:', data);
                    })
                    .catch(error => {
                        alert('Error al aceptar el usuario:', error);
                    });
            });

        })

        cancelButtons.forEach(button => { // cada vez que pulse el botón cancelar, borro al usuario de la BD segun id
            button.addEventListener('click', (ev) => {
                ev.preventDefault();

                const id = button.dataset.id;

                fetch("https://localhost:8000/usuario/api/eliminar/" + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(x => x.json())
                    .then(data => {
                        alert('Usuario borrado con éxito:', data);
                    })
                    .catch(error => {
                        // alert('Error al denegar el usuario:', error);
                    });

                    window.location.reload();
            })
        });
    }
});