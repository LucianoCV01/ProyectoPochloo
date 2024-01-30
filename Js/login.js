const usuariosLogueados = JSON.parse(localStorage.getItem('Usuario'));

//obtengo los datos con "getelementById"//
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    iniciarSesionPochloo();
});


//funcion para iniciar sesión//
function iniciarSesionPochloo() {
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;

    //verifico los espacios para que no haya nada vacio//
    if (email.trim() === '' || pass.trim() === '') {
        Swal.fire({
            title: "Error al iniciar sesión",
            text: "Ambos campos deben ser completados.",
            icon: "error",
        });
        return;}

        //verifico que haya un arroba en el mail//
    if (!email.includes('@')) {
            Swal.fire({
                title: "Formato de correo incorrecto",
                text: "Asegúrate de ingresar un correo electrónico válido.",
                icon: "error",
            });
            return;
        }

    fetch("../json/fakeApiEnzo.json")
        .then(response => response.json()) //aquí convierto la respuesta del fetch en formado de Javascript y luego con el DATOS manejo los datos//
        .then(DATOS => {
            const userLogeadoPochloo = DATOS.find(usuarioo => usuarioo.email === email && usuarioo.clave === pass);
            if (userLogeadoPochloo) {
                localStorage.setItem("Usuario" , JSON.stringify(userLogeadoPochloo)); //al usar el JSON.stringify lo convertimos en formato JSON para el local storage//
                Swal.fire({
                    title: "Bienvenido!!!",
                    text: "Te has logueado con éxito, bienvenido " +  userLogeadoPochloo.nombre,
                    icon: "success",
                })
                console.log("El usuario se ha logueado:", userLogeadoPochloo);

                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);

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

