window.addEventListener("DOMContentLoaded", function () {

    if (window.location.pathname === '/test') {
        const pantalla = document.getElementById('nuevoIntentoForm');
        var parametros = new URLSearchParams(window.location.search);
        var id = parametros.get("id");

        function finalizar() {
            var radioInputs = document.querySelectorAll('input[type="radio"]');
            var checkedRadioValues = {};

            radioInputs.forEach(function (radioInput) {
                if (radioInput.checked) {
                    var name = radioInput.name;
                    var id = radioInput.id;
                    if (!checkedRadioValues[name]) {
                        checkedRadioValues[name] = [];
                    }
                    checkedRadioValues[name].push(id);
                }
            });

            console.log(checkedRadioValues);
        }

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

        fetch("https://localhost:8000/pregunta/api/byExamen/" + id)
            .then(x => x.json())
            .then(preg => {
                for (let i = 0; i < preg.length; i++) {
                    fetch("https://localhost:8000/plantillaPreg")
                        .then(x => x.text())
                        .then(y => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(y, 'text/html');

                            const bodyContent = doc.body.innerHTML;
                            const divContent = document.createElement("div"); // Crear un nuevo div
                            divContent.innerHTML = bodyContent;
                            divContent.id = "preg" + i;

                            if (i === 0) { // Usar '===' en lugar de '=' para comparar
                                divContent.style.display = "block";
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
                            var lblA = divContent.querySelector('#lblA');
                            lblA.innerHTML = preg[i].opc1;

                            var b = divContent.querySelector('#B');
                            b.name = "preg" + i;
                            b.textContent = preg[i].opc2;
                            var lblB = divContent.querySelector('#lblB');
                            lblB.innerHTML = preg[i].opc2;

                            var c = divContent.querySelector('#C');
                            c.name = "preg" + i;
                            c.textContent = preg[i].opc3;
                            var lblC = divContent.querySelector('#lblC');
                            lblC.innerHTML = preg[i].opc3;

                            var image = divContent.querySelector('#testImage');
                            image.src = preg[i].url;

                            var siguiente = divContent.querySelector('#siguiente');
                            siguiente.id = "butt" + i;

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
                                    var sig = document.getElementById('preg' + (i + 1));
                                    sig.style.display = "block";
                                }
                            });

                            const buttonQuiz = document.querySelectorAll('.buttonQuiz');
                            buttonQuiz.forEach(function (button) {
                                button.addEventListener("click", function (ev) {
                                    ev.preventDefault();

                                    var actual = document.getElementById('preg' + i);
                                    actual.style.display = "none";
                                    num = this.id;

                                    var sig = document.getElementById('preg' + (num - 1));
                                    sig.style.display = "block";
                                })
                            });
                        });
                }
            });

    }
})