function getBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function (event) {
            var base64String = event.target.result.split(",")[1];
            callback(base64String);
        };

        reader.readAsDataURL(file);
    });
}