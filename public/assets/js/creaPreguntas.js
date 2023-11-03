window.addEventListener("DOMContentLoaded", function () {
    var select1 = document.getElementById("categoria");
    var select2 = document.getElementById("dificultad");
    var save = document.getElementById("save");
    var fichero = document.getElementById('imagenVideo');
    var imagen = document.getElementById('imagenPrevia');

    if (window.location.pathname === '/creaPreguntas') {
        fichero.addEventListener('change', function (ev) {
            var lector = new FileReader();
            lector.readAsDataURL(this.files[0])
            lector.onload = function (ev) {
                imagen.src = this.result;
                imagen.style.display = "block";
            }
        })

        fetch("https://localhost:8000/categoria/api")
            .then(x => x.json())
            .then(y => {
                for (let i = 0; i < y.length; i++) {
                    var option = document.createElement("option");
                    option.innerHTML = y[i].nombre;
                    option.value = y[i].id;
                    select1.appendChild(option);
                }
            });
        fetch("https://localhost:8000/dificultad/api")
            .then(x => x.json())
            .then(y => {
                for (let i = 0; i < y.length; i++) {
                    var option = document.createElement("option");
                    option.innerHTML = y[i].nombre;
                    option.value = y[i].id;
                    select2.appendChild(option);
                }
            });

        save.addEventListener("click", function (ev) {
            ev.preventDefault();

            const selectedFile = document.getElementById("imagenVideo").files[0];
            if (selectedFile) {
                // Crea un objeto FileReader para leer el archivo
                const reader = new FileReader();

                // Cuando la lectura del archivo esté completa, ejecuta esta función
                reader.onload = function (e) {
                    const base64String = e.target.result; // Obtén el base64String dentro de esta función
                    console.log(base64String);

                    var ext = selectedFile.name.split('.').pop();

                    //creo el objeto Dificultad
                    var comboDif = document.getElementById('dificultad');
                    var selectedDifVal = comboDif.options[comboDif.selectedIndex].value;

                    //creo el objeto Categoria
                    var comboCat = document.getElementById('categoria');
                    var selectedCatVal = comboCat.options[comboCat.selectedIndex].value;

                    var comboCorr = document.getElementById('correcta');
                    var selectedCorr = comboCorr.options[comboCorr.selectedIndex].text;

                    const updatedPreguntaData = {
                        enunciado: document.getElementById('enunciado').value,
                        opc1: document.getElementById('opcion1').value,
                        opc2: document.getElementById('opcion2').value,
                        opc3: document.getElementById('opcion3').value,
                        correcta: selectedCorr,
                        url: base64String,
                        urltype: ext,
                        idCategoria: selectedCatVal,
                        idDificultad: selectedDifVal
                    };

                    console.log(updatedPreguntaData);

                    // Aquí realizas la solicitud Fetch dentro de la función onload
                    fetch("https://localhost:8000/pregunta/api/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedPreguntaData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            alert('Usuario aceptado con éxito:', data);
                        })
                        .catch(error => {
                            alert('Error al aceptar el usuario:', error);
                        });
                };

                // Lee el archivo como base64
                reader.readAsDataURL(selectedFile);
            }
            document.getElementById("nuevaPreguntaForm").reset();
            window.scrollTo(0, 0);
        })
    }
});