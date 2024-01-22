const usuariosLogueados = JSON.parse(localStorage.getItem('Usuario'));

function iniciarSesionPochloo() {
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;
    fetch("../json/fakeApiEnzo.json")
        .then(response => response.json())
        .then(DATOS => {
            const userLogeadoPochloo = DATOS.find(usuarioo => usuarioo.email === email && usuarioo.clave === pass);
            if (userLogeadoPochloo) {
                localStorage.setItem("USUARIO" , JSON.stringify(userLogeadoPochloo));
                Swal.fire({
                    title: "Bienvenido!!!",
                    text: "Te haz logueado con éxito, bienvenido " +  userLogeadoPochloo.nombre,
                    icon: "success",
                })
                console.log("El usuario se ha logueado:", userLogeadoPochloo);
            } else {
                Swal.fire({
                    title: "Usuario y/o contraseña incorrectos!",
                    text: "Intenta nuevamente",
                    icon: "error",
                })
                console.log("Este usuario no está en el sistema");
            }
        })
        .catch(error => console.log(error)
        );
}

function recuperarContraseña() {
    const emailRecuperar = document.getElementById('inputEmailRecuperar').value;}