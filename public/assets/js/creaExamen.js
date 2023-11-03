window.addEventListener("DOMContentLoaded", function () {
    var radioCategoria = document.getElementById('radioCategoria');
    var radioDificultad = document.getElementById('radioDificultad');
    var formulario = document.getElementById('nuevaPreguntaForm');

    if (window.location.pathname === '/creaExamen') {
        radioCategoria.addEventListener('change', function () {
            if (radioCategoria.checked) {
                var label = document.createElement('label');
                label.innerHTML = "Selecciona una categoria<br><br>";
                var select = document.createElement('select');
                select.id = "categoria";
                var option = document.createElement('option');
                option.innerHTML = "Sin seleccionar";
                option.selected = true;
                select.appendChild(option);
                fetch("https://localhost:8000/categoria/api")
                    .then(x => x.json())
                    .then(y => {
                        for (let i = 0; i < y.length; i++) {
                            var option = document.createElement("option");
                            option.innerHTML = y[i].nombre;
                            option.value = y[i].id;
                            select.appendChild(option);
                        }
                    });
                formulario.appendChild(label);
                formulario.appendChild(select);
                select.addEventListener('change', function () {
                    var div = document.createElement("div");
                    var label = document.createElement('label');
                    label.innerHTML = "<br><br>Selecciona las preguntas<br><br>";
                    var select = document.createElement('select');
                    select.id = "categoria";
                    select.multiple = true;
                    var combo = document.getElementById('categoria');
                    var selected = combo.options[combo.selectedIndex].value;
                    console.log(selected);
                
                    fetch("https://localhost:8000/pregunta/api/" + selected)
                        .then(response => {
                            if (response.status === 404) {
                                var option = document.createElement('option');
                                option.innerHTML = "No hay ninguna pregunta para esta categoría";
                                option.selected = true;
                                select.appendChild(option);
                            } else if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error('Error en la solicitud: ' + response.status);
                            }
                        })
                        .then(data => {
                            for (let i = 0; i < data.length; i++) {
                                var option = document.createElement("option");
                                option.innerHTML = data[i].enunciado;
                                option.value = data[i].id;
                                select.appendChild(option);
                            }
                            div.appendChild(label);
                            div.appendChild(select);
                            formulario.appendChild(div);
                        })
                        .catch(error => {
                            alert('Error al aceptar el usuario: ' + error.message);
                            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
                        });
                });
            }
        });

        radioDificultad.addEventListener('change', function () {
            if (radioDificultad.checked) {
                var label = document.createElement('label');
                label.innerHTML = "Selecciona una dificultad";
                var select = document.createElement('select');
                select.id = "dificultad";
                fetch("https://localhost:8000/dificultad/api")
                    .then(x => x.json())
                    .then(y => {
                        for (let i = 0; i < y.length; i++) {
                            var option = document.createElement("option");
                            option.innerHTML = y[i].nombre;
                            option.value = y[i].id;
                            select.appendChild(option);
                        }
                    });
                formulario.appendChild(label);
                formulario.appendChild(select);
            }
        });
    }
});