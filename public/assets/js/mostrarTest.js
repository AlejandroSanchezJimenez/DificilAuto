window.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === '/test') { //comprobamos que la página sea la actual para no declarar nada sin motivo
        const pantalla = document.getElementById('nuevoIntentoForm');
        var parametros = new URLSearchParams(window.location.search);
        var exId = parametros.get("exId");
        var usId = parametros.get("usId");
        let tiempoRestante;
        const contadorElemento = document.getElementById('contador');
        const intervalo = setInterval(actualizarContador, 1000);
        var jsonRespuestas = []

        if (parametros.get('inId')) { //en caso de que venga de checkTest quito el contador y el botón de finalizar
            document.getElementById('contador').remove();
            document.getElementById('finalizar').remove();
        } else { // en caso contrario obtengo de la BD la fecha de inicio y calculo el tiempo restante usando la función declarada más abajo
            fetch("https://localhost:8000/intento/last")
                .then(x => x.json())
                .then(data => {
                    const milisegundos = data.fecha;
                    tiempoRestante = calcularTiempoRestante(milisegundos);
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error.message);
                });
        }

        function rellenar() { // con esta función relleno las preguntas en caso de que vengamos de CheckTest 
            if (parametros.get('inId')) {
                this.document.body.addEventListener("click", function (ev) {
                    ev.preventDefault();
                });
                var inId = parametros.get('inId');
                fetch("https://localhost:8000/intento/api/" + inId)
                    .then(x => x.json())
                    .then(preg => {
                        for (var clave in preg) {
                            for (var i = 0; i < preg[clave].length; i++) { // por cada valor busco los inputs relacionados por pregunta
                                var name = "preg" + i;
                                var radioElements = document.querySelectorAll('input[type="radio"][name="' + name + '"]');

                                if (radioElements.length > 0) {
                                    for (var j = 0; j < radioElements.length; j++) {
                                        if (radioElements[j].id == preg[clave][i]) { //si coinciden id de input y de jsonRespuestas, pongo el checked en true
                                            radioElements[j].checked = true;
                                        }
                                    }
                                }
                            }
                        }
                    })
            } else if (localStorage.getItem('respuestas')) { // en caso de que existan datos de respuestas en el localstorage, los vuelco igual que si viniese de CheckTest
                var arrayRespuestas = JSON.parse(localStorage.getItem('respuestas'));
                for (var i = 0; i < 10; i++) {
                    var name = "preg" + i;
                    var radioElements = document.querySelectorAll('input[type="radio"][name="' + name + '"]');

                    if (radioElements.length > 0) {
                        for (var j = 0; j < radioElements.length; j++) {
                            if (radioElements[j].id == arrayRespuestas[i]) {
                                radioElements[j].checked = true;
                            }
                        }
                    }
                }
            }
        }

        function calcularTiempoRestante(horaInicio) { // función para calcular el tiempo restante, declaro tiempo limite en min y seg, calculo diferencia en segundos 
            const tiempoLimiteMinutos = 10;
            const tiempoLimiteSegundos = tiempoLimiteMinutos * 60;

            const diferenciaSegundos = Math.floor((new Date() - horaInicio) / 1000);

            const tiempoRestante = tiempoLimiteSegundos - diferenciaSegundos;

            return tiempoRestante >= 0 ? tiempoRestante : 0;
        }

        function actualizarContador() { // actualiza el contador y lanzamos un alert cuando se acaba el tiempo
            const minutos = Math.floor(tiempoRestante / 60);
            const segundos = tiempoRestante % 60;

            contadorElemento.textContent = `Tiempo: ${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

            tiempoRestante--;

            if (tiempoRestante < 0) {
                clearInterval(intervalo);
                alert("¡Tiempo agotado!");
                finalizar();
            }
        }

        function openModal() { // functión para abrir el modal de finalizar 
            document.getElementById('modal').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }

        function closeModal() { // función para cerrar el modal de finalizar
            document.getElementById('modal').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

        function finalizar() { // función para finalizar el examen
            localStorage.clear(); // nos cargamos el localstorage para que no tenga conflicto con otros éxamenes
            respuestas = [];
            for (var i = 0; i < 10; i++) { // por cada pregunta buscamos todos sus inputs y guardamos el id de los checkeados, si no hay ninguno checkeado guardamos ''
                var name = "preg" + i;
                var radioElements = document.querySelectorAll('input[type="radio"][name="' + name + '"]');

                var isChecked = false;

                radioElements.forEach(function (radioInput) {
                    if (radioInput.checked) {
                        respuestas.push(radioInput.id);
                        isChecked = true;
                    }
                });

                if (!isChecked) {
                    respuestas.push('');
                }
            }
            const postIntentoData = { // declaramos los datos listos para enviar por fetch post
                jsonRespuestas: respuestas,
                idalumno: usId,
                idexamen: exId
            };

            fetch("https://localhost:8000/intento/api", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postIntentoData),
            })
                .then(response => response.json())
                .then(data => {
                    alert('Intento guardado con éxito')
                })
                .catch(error => {
                    alert('Error al guardar el intento:', error.message);
                });
        }

        document.addEventListener("keydown", function (ev) { // lista de eventos de pulsación para manejar el test entero mediante teclado
            var divActual = document.getElementsByClassName('divActual') // nos limitamos a buscar el div actual y dentro de este los campos pertinentes, una vez encontrados los clicamos
            if (ev.code == "ArrowRight") {
                ev.preventDefault()
                var butt = divActual[0].getElementsByClassName('siguiente');
                Array.from(butt).forEach(innerElement => {
                    innerElement.click();
                });
            } else if (ev.code == "ArrowLeft") {
                ev.preventDefault()
                var butt = divActual[0].getElementsByClassName('anterior');
                Array.from(butt).forEach(innerElement => {
                    innerElement.click();
                });
            } else if (ev.key == "d") {
                ev.preventDefault()
                var butt = divActual[0].getElementsByClassName('duda');
                Array.from(butt).forEach(innerElement => {
                    innerElement.click();
                });
            } else if (ev.key == "q") {
                ev.preventDefault()
                var butt = divActual[0].getElementsByClassName('quitar');
                Array.from(butt).forEach(innerElement => {
                    innerElement.click();
                });
            } else if (ev.key == "a" || ev.key == "b" || ev.key == "c") {
                var radioId = ev.key.toUpperCase();
                var radio = divActual[0].getElementsByClassName(radioId);
                Array.from(radio).forEach(innerElement => {
                    innerElement.click();
                });
            } else if (ev.code == 'Numpad1' || ev.code == "Numpad2" || ev.code == "Numpad3" ||
                ev.code == 'Numpad4' || ev.code == "Numpad5" || ev.code == "Numpad6" ||
                ev.code == 'Numpad7' || ev.code == "Numpad8" || ev.code == "Numpad9"
            ) {
                ev.preventDefault();
                var cadena = ev.code;
                var numMatch = cadena.match(/\d+$/);
                var num = parseInt(numMatch, 10);

                var butt = document.getElementById(num);
                butt.click();
            }
        });

        this.document.body.addEventListener("click", function (ev) { // lista de eventos de clicado 

            if (ev.target.tagName === "BUTTON" && ev.target.classList.contains('quitar')) { // cambia el checked del input a false 
                ev.preventDefault();
                var cadena = ev.target.id;
                var numMatch = cadena.match(/\d+$/);
                var num = parseInt(numMatch, 10);

                const options = document.querySelectorAll('input[name="preg' + (num) + '"]');

                options.forEach(function (opt) {
                    opt.checked = false;
                })
            } else if (ev.target.tagName === "INPUT" && ev.target.classList.contains('duda')) { // pinta como duda en el navegador la pregunta y viceversa
                var cadena = ev.target.id;
                var numMatch = cadena.match(/\d+$/);
                var num = parseInt(numMatch, 10);

                if (ev.target.checked) {
                    var butt = document.getElementById(num + 1);
                    butt.style.backgroundColor = "orange";
                } else {
                    var butt = document.getElementById(num + 1);
                    butt.style.backgroundColor = "";
                }
            } else if (ev.target.tagName === "BUTTON" && ev.target.classList.contains('finalizar')) { // abre modal
                ev.preventDefault();
                openModal();
            } else if (ev.target.tagName === "BUTTON" && ev.target.classList.contains('confirm-button')) { // finaliza el test y redirecciona
                finalizar();
                closeModal();
                window.location.href = "/home"
            } else if (ev.target.tagName === "BUTTON" && ev.target.classList.contains('cancel-button')) { // cierra modal
                closeModal();
            } else if (ev.target.tagName === 'INPUT' && ev.target.type === 'radio' && parametros.get('inId') === null) { // guarda en localstorage cada vez que se clica en un input
                var cadena = ev.target.parentElement.parentElement.id;
                var numMatch = cadena.match(/\d+$/);
                var num = parseInt(numMatch, 10);

                jsonRespuestas[num] = ev.target.className;

                localStorage.setItem('respuestas', JSON.stringify(jsonRespuestas));
            }
        })

        fetch("https://localhost:8000/pregunta/api/byExamen/" + exId) // fetch que trae un examen dependiendo de su id, la cual obtenemos mediante get de servidor
            .then(x => x.json())
            .then(preg => {
                for (let i = 0; i < preg.length; i++) { // por cada pregunta nos traemos una plantilla y la rellenamos
                    fetch("https://localhost:8000/plantillaPreg")
                        .then(x => x.text())
                        .then(y => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(y, 'text/html');

                            const bodyContent = doc.body.innerHTML;
                            const divContent = document.createElement("div");
                            divContent.innerHTML = bodyContent;
                            divContent.id = "preg" + i;

                            if (i === 0) {
                                divContent.style.display = "block";
                                divContent.className = "divActual"
                            } else {
                                divContent.style.display = "none";
                            }
                            pantalla.appendChild(divContent);

                            var tit = divContent.querySelector('#tit');
                            tit.textContent = 'Pregunta ' + (i + 1);

                            var enun = divContent.querySelector('#enun');
                            enun.textContent = preg[i].enunciado;

                            var a = divContent.querySelector('#A');
                            a.name = "preg" + i;
                            a.textContent = preg[i].opc1;
                            a.className = "A";
                            var lblA = divContent.querySelector('#lblA');
                            lblA.innerHTML = 'A) ' + preg[i].opc1;

                            var b = divContent.querySelector('#B');
                            b.name = "preg" + i;
                            b.textContent = preg[i].opc2;
                            b.className = "B";
                            var lblB = divContent.querySelector('#lblB');
                            lblB.innerHTML = 'B) ' + preg[i].opc2;

                            var c = divContent.querySelector('#C');
                            c.name = "preg" + i;
                            c.textContent = preg[i].opc3;
                            c.className = "C";
                            var lblC = divContent.querySelector('#lblC');
                            lblC.innerHTML = 'C) ' + preg[i].opc3;

                            var image = divContent.querySelector('#testImage');
                            image.src = preg[i].url;

                            var siguiente = divContent.querySelector('#siguiente');
                            siguiente.id = "butt" + i;

                            var anterior = divContent.querySelector('#anterior');
                            anterior.id = "buttAn" + i;

                            var quitar = divContent.querySelector('#quitar');
                            quitar.id = "quit" + i;

                            var duda = divContent.querySelector('#duda');
                            duda.id = "duda" + i;

                            if (parametros.get('inId')) {
                                quitar.remove()
                                duda.remove()
                                divContent.querySelector('#dudalbl').remove();
                            }

                            if (siguiente.id == "butt9") {
                                if (parametros.get('inId')) {
                                    siguiente.remove();
                                } else {
                                    siguiente.textContent = "Terminar intento";
                                    siguiente.style.width = "150px";
                                }
                            }

                            siguiente.addEventListener("click", function (ev) { // al pulsar en siguiente ubico en que div estoy y cual es el siguiente para cambiar su display
                                ev.preventDefault();

                                if (siguiente.id == "butt9") {
                                    openModal();
                                } else {
                                    this.parentElement.parentElement.style.display = "none";
                                    this.parentElement.parentElement.className = ""
                                    var sig = document.getElementById('preg' + (i + 1));
                                    sig.style.display = "block";
                                    sig.className = "divActual";
                                }
                            });

                            anterior.addEventListener("click", function (ev) { // igual que siguiente para el anterior
                                ev.preventDefault();

                                if (anterior.id == "butt0") {

                                } else {
                                    this.parentElement.parentElement.style.display = "none";
                                    this.parentElement.parentElement.className = "divActual";
                                    var sig = document.getElementById('preg' + (i - 1));
                                    sig.style.display = "block";
                                    sig.className = "divActual";
                                }
                            });

                            const buttonQuiz = document.querySelectorAll('.buttonQuiz'); // igual que siguiente pero desde el display de navegador
                            buttonQuiz.forEach(function (button) {
                                button.addEventListener("click", function (ev) {
                                    ev.preventDefault();

                                    var actual = document.getElementById('preg' + i);
                                    actual.style.display = "none";
                                    actual.className = "";
                                    num = this.id;

                                    var sig = document.getElementById('preg' + (num - 1));
                                    sig.style.display = "block";
                                    sig.className = "divActual";
                                })
                            });

                            rellenar(); // rellenar en caso de que vengamos de TestChooser
                        });
                }
            });
    }
})