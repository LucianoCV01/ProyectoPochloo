const usuariosLogueados = JSON.parse(localStorage.getItem('Usuario'));

function iniciarSesionPochloo() {
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;
    fetch("../json/fakeApiEnzo")
        .then(response => response.json())
        .then(users => {
            const userLogeadoPochloo = users.find(user => user.email === email && user.clave === pass);

            if (userLogeadoPochloo) {
                console.log("Usuario logueado:", userLogeadoPochloo);
            } else {
                console.log("Este usuario no está en el sistema");
            }
        });
}
