const usuariosLogueados = JSON.parse(localStorage.getItem('Usuario'));

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    iniciarSesionPochloo();
});

function iniciarSesionPochloo() {
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;

    if (email.trim() === '' || pass.trim() === '') {
        Swal.fire({
            title: "Error al iniciar sesión",
            text: "Ambos campos deben ser completados.",
            icon: "error",
        });
        return;}

    if (!email.includes('@')) {
            Swal.fire({
                title: "Formato de correo incorrecto",
                text: "Asegúrate de ingresar un correo electrónico válido.",
                icon: "error",
            });
            return;
        }

    fetch("../json/fakeApiEnzo.json")
        .then(response => response.json())
        .then(DATOS => {
            const userLogeadoPochloo = DATOS.find(usuarioo => usuarioo.email === email && usuarioo.clave === pass);
            if (userLogeadoPochloo) {
                localStorage.setItem("Usuario" , JSON.stringify(userLogeadoPochloo));
                Swal.fire({
                    title: "Bienvenido!!!",
                    text: "Te has logueado con éxito, bienvenido " +  userLogeadoPochloo.nombre,
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
    const emailRecuperar = document.getElementById('inputEmailRecuperar').value;
}