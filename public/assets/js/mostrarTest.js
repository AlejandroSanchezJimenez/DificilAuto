window.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === '/test') {
        const pantalla = document.getElementById('nuevoIntentoForm');
        var parametros = new URLSearchParams(window.location.search);
        var exId = parametros.get("exId");
        var usId = parametros.get("usId");

        
        let tiempoRestante = 600;
        const contadorElemento = document.getElementById('contador');
        const intervalo = setInterval(actualizarContador, 1000);

        function actualizarContador() {
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

        actualizarContador();

        function rellenar() {
            if (parametros.get('inId')) {
                this.document.body.addEventListener("click", function (ev) {
                    ev.preventDefault();
                });
                var inId = parametros.get('inId');
                fetch("https://localhost:8000/intento/api/" + inId)
                    .then(x => x.json())
                    .then(preg => {
                        for (var clave in preg) {
                            for (var i = 0; i < preg[clave].length; i++) {
                                var name = "preg" + i;
                                var radioElements = document.querySelectorAll('input[type="radio"][name="' + name + '"]');

                                if (radioElements.length > 0) {
                                    for (var j = 0; j < radioElements.length; j++) {
                                        if (radioElements[j].id == preg[clave][i]) {
                                            radioElements[j].checked = true;
                                        }
                                    }
                                }
                            }
                        }
                    })
            }
        }

        function finalizar() {
            respuestas = [];
            for (var i = 0; i < 10; i++) {
                var name = "preg" + i;
                var radioElements = document.querySelectorAll('input[type="radio"][name="' + name + '"]');

                radioElements.forEach(function (radioInput) {
                    if (radioInput.checked) {
                        respuestas.push(radioInput.id);
                    }
                });
            }
            const postIntentoData = {
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
                    alert('Intento guardado con éxito:', data);
                })
                .catch(error => {
                    alert('Error al guardar el intento:', error.message);
                });
        }

        document.addEventListener("keydown", function (ev) {
            var divActual = document.getElementsByClassName('divActual')
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

        this.document.body.addEventListener("click", function (ev) {

            if (ev.target.tagName === "BUTTON" && ev.target.classList.contains('quitar')) {
                ev.preventDefault();
                var cadena = ev.target.id;
                var numMatch = cadena.match(/\d+$/);
                var num = parseInt(numMatch, 10);

                const options = document.querySelectorAll('input[name="preg' + (num) + '"]');

                options.forEach(function (opt) {
                    opt.checked = false;
                })
            } else if (ev.target.tagName === "INPUT" && ev.target.classList.contains('duda')) {
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
            } else if (ev.target.tagName === "BUTTON" && ev.target.classList.contains('finalizar')) {
                ev.preventDefault();
                finalizar();
            }
        })

        fetch("https://localhost:8000/pregunta/api/byExamen/" + exId)
            .then(x => x.json())
            .then(preg => {
                for (let i = 0; i < preg.length; i++) {
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

                            if (siguiente.id == "butt9") {
                                siguiente.textContent = "Terminar intento";
                                siguiente.style.width = "150px";
                            }

                            siguiente.addEventListener("click", function (ev) {
                                ev.preventDefault();

                                if (siguiente.id == "butt9") {
                                    finalizar();
                                } else {
                                    this.parentElement.parentElement.style.display = "none";
                                    this.parentElement.parentElement.className = ""
                                    var sig = document.getElementById('preg' + (i + 1));
                                    sig.style.display = "block";
                                    sig.className = "divActual";
                                }
                            });

                            anterior.addEventListener("click", function (ev) {
                                ev.preventDefault();

                                if (siguiente.id == "butt0") {

                                } else {
                                    this.parentElement.parentElement.style.display = "none";
                                    this.parentElement.parentElement.className = "divActual";
                                    var sig = document.getElementById('preg' + (i - 1));
                                    sig.style.display = "block";
                                    sig.className = "divActual";
                                }
                            });

                            const buttonQuiz = document.querySelectorAll('.buttonQuiz');
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

                            rellenar();
                        });
                }
            });
    }
})