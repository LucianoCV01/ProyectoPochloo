let sesionLink = document.getElementById("sesionLink")
let adminLink = document.getElementById("adminLink")

function existeLocalStorage(clave) {
    return localStorage.getItem(clave) !== null;
}

