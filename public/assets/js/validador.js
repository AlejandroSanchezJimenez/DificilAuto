window.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === '/validaAlumnos') {
        const acceptButtons = document.querySelectorAll('.accept');

        acceptButtons.forEach(button => {
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

                fetch("https://localhost:8000/usuario/api/editar/" + id, {
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
    }
});