function getBase64(file) { // convierte un archivo a base64
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function (event) {
            var base64String = event.target.result.split(",")[1];
            callback(base64String);
        };

        reader.readAsDataURL(file);
    });
}

function iniIntento() { // inicializa un intento cada vez que entras al examen
    fetch("https://localhost:8000/intento/api")
}

function generarExamen(user) { // genera un examen aleatorio segun dificultad para el usuario que lo solicite

    var arrayUser = []
    arrayUser.push(user);

    var parametros = new URLSearchParams(window.location.search);
    var dif = parametros.get('dif')

    const postExamenData = {
        preguntas: null,
        alumnos: arrayUser,
        categoria: null,
        dificultad: dif
    };

    console.log(postExamenData);

    fetch("https://localhost:8000/examen/api", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(postExamenData),
})
    .then(response => response.json())
    .then(data => {
        alert('Examen aceptado con éxito:', data);
    })
    .catch(error => {
        alert('Error al aceptar el usuario:', error);
    });

    window.location.href = "/testChooser?dif="+dif //redireeciono
}
