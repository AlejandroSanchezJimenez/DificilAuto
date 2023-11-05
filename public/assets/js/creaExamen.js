window.addEventListener("DOMContentLoaded", function () {
    var radioCategoria = document.getElementById('radioCategoria');
    var radioDificultad = document.getElementById('radioDificultad');
    var formulario = document.getElementById('nuevoExamenForm');
    var pantalla = document.getElementById('formWindow');
    const br = document.createElement("br");
    const limit = 10;

    if (window.location.pathname === '/creaExamen') {
        radioCategoria.addEventListener('change', function () {
            if ((radioCategoria.checked)) {
                const generadas = document.querySelectorAll('.generadaDif');
                generadas.forEach(function (elemento) {
                    elemento.remove()
                });
                const generadas2 = document.querySelectorAll('.generadaBRDif');
                generadas2.forEach(function (elemento) {
                    elemento.remove()
                });
                var indiceDif = document.getElementsByClassName('indiceDif')
                if (indiceDif) {
                    for (let i = 0; i < indiceDif.length; i++) {
                        indiceDif[i].style.display = "none";
                    }
                }
                var indiceCat = document.getElementsByClassName('indiceCat');
                for (let i = 0; i < indiceCat.length; i++) {
                    indiceCat[i].style.display = "block";
                }
                var select = document.createElement('select');
                select.id = "categoria";
                select.className = "generadaCat";
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
                labelCat.appendChild(br);
                labelCat.appendChild(select);

                select.addEventListener('change', function () {
                    if (document.querySelectorAll('.checkboxes') !== null) {
                        const generadas2 = document.querySelectorAll('.checkboxes');
                        generadas2.forEach(function (elemento) {
                            elemento.remove()
                        });

                        const generadas = document.querySelectorAll('.generadaLabelCat');
                        generadas.forEach(function (elemento) {
                            elemento.remove()
                        });

                        const generadas3 = document.querySelectorAll('.generadaBRCat');
                        generadas3.forEach(function (elemento) {
                            elemento.remove()
                        });
                    }
                    var labelPreg = document.getElementById("labelPreg");
                    var divCheckbox = document.createElement('div');
                    divCheckbox.className = "generadaCat";
                    var combo = document.getElementById('categoria');
                    var selected = combo.options[combo.selectedIndex].value;

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
                                const checkbox = document.createElement("input");
                                checkbox.type = "checkbox";
                                checkbox.name = "checkbox" + (i + 1);
                                checkbox.value = data[i].id;
                                checkbox.className = "checkboxes";

                                const label = document.createElement("label");
                                label.textContent = data[i].enunciado;
                                label.className = "generadaLabelCat";

                                const br = document.createElement("br");
                                br.className = "generadaBRCat";

                                checkbox.addEventListener('change', function () {
                                    const checkboxesMarcados = document.querySelectorAll('.checkboxes:checked').length;

                                    if (checkboxesMarcados === limit) {
                                        var labelAlum = document.getElementById("labelAlum");
                                        var div = document.createElement('div');
                                        div.id = "alumnos";
                                        div.className = "alumnos";

                                        fetch("/usuario/api/")
                                            .then(response => {
                                                if (response.status === 404) {
                                                    var option = document.createElement('option');
                                                    option.innerHTML = "No hay ningun alumno";
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
                                                    const checkbox = document.createElement("input");
                                                    checkbox.type = "checkbox";
                                                    checkbox.name = "checkbox" + (i + 1);
                                                    checkbox.value = data[i].id;
                                                    checkbox.className = "checkboxesAlum";

                                                    const label = document.createElement("label");
                                                    label.textContent = data[i].email + "\n";
                                                    label.className = "generadaCat";

                                                    const br = document.createElement("br");
                                                    br.className = "generadaBRCat";

                                                    div.appendChild(br);
                                                    div.appendChild(checkbox);
                                                    div.appendChild(label);
                                                    labelAlum.appendChild(div);

                                                    checkbox.addEventListener('change', function () {
                                                        const checkboxesMarcados = document.querySelectorAll('.checkboxesAlum:checked').length;

                                                        if (checkboxesMarcados >= 1) {
                                                            if (document.getElementById("save") == null) {
                                                                var div = document.createElement("div");
                                                                div.className = "generadaCat";
                                                                var button = document.createElement('button');
                                                                button.id = "save";
                                                                button.className = "save";
                                                                button.type = "submit";
                                                                div.appendChild(button);
                                                                formulario.appendChild(div);
                                                                pantalla.style.paddingBottom = "8%";

                                                                save.addEventListener("click", function (ev) {
                                                                    ev.preventDefault();

                                                                    const checkboxesMarcados = document.querySelectorAll('.checkboxes:checked');
                                                                    var arrayPreg = [];

                                                                    checkboxesMarcados.forEach(function (elemento) {
                                                                        arrayPreg.push(elemento.value);
                                                                    });

                                                                    const checkboxesMarcadosAlum = document.querySelectorAll('.checkboxesAlum:checked');
                                                                    var arrayAlum = [];

                                                                    checkboxesMarcadosAlum.forEach(function (elemento) {
                                                                        arrayAlum.push(elemento.value);
                                                                    });

                                                                    const updatedPreguntaData = {
                                                                        preguntas: arrayPreg,
                                                                        intentos: arrayAlum,
                                                                    };

                                                                    console.log(updatedPreguntaData);

                                                                    // fetch("https://localhost:8000/examen/api", {
                                                                    //     method: 'POST',
                                                                    //     headers: {
                                                                    //         'Content-Type': 'application/json',
                                                                    //     },
                                                                    //     body: JSON.stringify(updatedPreguntaData),
                                                                    // })
                                                                    //     .then(response => response.json())
                                                                    //     .then(data => {
                                                                    //         alert('Examen aceptado con éxito:', data);
                                                                    //     })
                                                                    //     .catch(error => {
                                                                    //         alert('Error al aceptar el usuario:', error);
                                                                    //     });
                                                                    // window.scrollTo(0, 0);
                                                                });
                                                            }
                                                        } else if ((document.getElementById("alumnos") !== null) && (checkboxesMarcados < 1)) {
                                                            document.querySelector(".save").remove();
                                                        }
                                                    })
                                                }
                                            })
                                            .catch(error => {
                                                alert('Error al aceptar el usuario: ' + error.message);
                                            });
                                    } else if ((document.getElementById("alumnos") !== null) && (checkboxesMarcados != limit)) {
                                        document.querySelector(".alumnos").remove();
                                    }
                                })

                                labelPreg.appendChild(br);
                                labelPreg.appendChild(checkbox);
                                labelPreg.appendChild(label);
                            }
                        })
                        .catch(error => {
                            alert('Error al aceptar el usuario: ' + error.message);
                        });
                });
            }
        });

        radioDificultad.addEventListener('change', function () {
            if (radioDificultad.checked) {
                const generadas2 = document.querySelectorAll('.checkboxes');
                generadas2.forEach(function (elemento) {
                    elemento.remove()
                });
                const generadas3 = document.querySelectorAll('.checkboxesAlum');
                generadas3.forEach(function (elemento) {
                    elemento.remove()
                });
                const generadas = document.querySelectorAll('.generadaCat');
                generadas.forEach(function (elemento) {
                    elemento.remove()
                });
                const generadas5 = document.querySelectorAll('.generadaBRCat');
                generadas5.forEach(function (elemento) {
                    elemento.remove()
                });
                const generadas4 = document.querySelectorAll('.generadaLabelCat');
                generadas4.forEach(function (elemento) {
                    elemento.remove()
                });
                var indiceDif = document.getElementsByClassName('indiceDif');
                for (let i = 0; i < indiceDif.length; i++) {
                    indiceDif[i].style.display = "block";
                }

                var indiceCat = document.getElementsByClassName('indiceCat');
                for (let i = 0; i < indiceCat.length; i++) {
                    indiceCat[i].style.display = "none";
                }

                var labelDif = document.getElementById('labelDif');
                var select = document.createElement('select');
                select.id = "dificultad";
                select.className = "generadaDif";
                var option = document.createElement('option');
                option.innerHTML = "Sin seleccionar";
                option.selected = true;
                select.appendChild(option);
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
                labelDif.appendChild(br);
                labelDif.appendChild(select);

                select.addEventListener('change', function () {
                    if (document.getElementById("alumnos") !== null) {
                        const generadas = document.querySelectorAll('.alumnos');
                        generadas.forEach(function (elemento) {
                            elemento.remove()
                        });
                    }
                    var labelAlum = document.getElementById("labelAlumDif");
                    var div = document.createElement('div');
                    div.id = "alumnos";
                    div.className = "alumnos";

                    fetch("/usuario/api/")
                        .then(response => {
                            if (response.status === 404) {
                                var option = document.createElement('option');
                                option.innerHTML = "No hay ningun alumno";
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
                                const checkbox = document.createElement("input");
                                checkbox.type = "checkbox";
                                checkbox.name = "checkbox" + (i + 1);
                                checkbox.value = data[i].id;
                                checkbox.className = "checkboxes";

                                const label = document.createElement("label");
                                label.textContent = data[i].email + "\n";
                                label.className = "generadaCat";

                                const br = document.createElement("br");
                                br.className = "generadaBRDif";

                                div.appendChild(br);
                                div.appendChild(checkbox);
                                div.appendChild(label);
                                labelAlum.appendChild(div);

                                checkbox.addEventListener('change', function () {
                                    const checkboxesMarcados = document.querySelectorAll('.checkboxes:checked').length;

                                    if (checkboxesMarcados >= 1) {
                                        if (document.getElementById("save") == null) {
                                            var div = document.createElement("div");
                                            div.className = "generadaDif";
                                            var button = document.createElement('button');
                                            button.id = "save";
                                            button.className = "save";
                                            button.type = "submit";
                                            div.appendChild(button);
                                            formulario.appendChild(div);
                                            pantalla.style.paddingBottom = "8%";

                                            save.addEventListener("click", function (ev) {
                                                ev.preventDefault();

                                                console.log("adios");
                                            });
                                        }
                                    } else if ((document.getElementById("alumnos") !== null) && (checkboxesMarcados != limit)) {
                                        document.querySelector(".save").remove();
                                    }
                                })
                            }
                        })
                        .catch(error => {
                            alert('Error al aceptar el usuario: ' + error.message);
                        });
                })
            }
        });
    }
});