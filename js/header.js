let sesionLink = document.getElementById("sesionLink")
let adminLink = document.getElementById("adminLink")

function existeLocalStorage(clave) {
    return localStorage.getItem(clave) !== null;
}

const controlarAdmin = () =>
{
    let persona = JSON.parse(localStorage.getItem("Logueado"))
    if(!(persona.tipo == "Administrador"))
    {
        adminLink.style.display = "none"
    }
}


if (existeLocalStorage("Logueado")) {
    controlarAdmin()
} else {
    window.location.href = "../index.html"
}