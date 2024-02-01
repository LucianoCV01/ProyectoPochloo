let usuarioNuevoRegistrado = []
usuarioNuevoRegistrado = JSON.parse(localStorage.getItem('Registro'))

document.getElementById('formularioDeRegistro').addEventListener('submit', function(event) {
    event.preventDefault();
    registroDeUsuarios();
});

function registroDeUsuarios() {
    const name = document.getElementById('nombre').value;
    const lastname = document.getElementById('apellido').value;
    const mail = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;
    const Comun = "Comun";
    const Pendiente = "Pendiente";

    if (name === '' || lastname === '' || mail === '' || pass === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error de Registro',
            text: 'Por favor, completa todos los campos.'
        });
        return;
    }

    if (!mail.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'Error de Registro',
            text: 'Por favor, ingresa un correo electrónico válido.'
        });
        return;
    }

    const newUser = {
        nombre: name,
        apellido: lastname,
        email: mail,
        clave: pass,
        tipo: Comun,
        estado: Pendiente
    };

    
            const usuarioExistente = usuarioNuevoRegistrado.find(usuario => usuario.email === mail);
            if (usuarioExistente) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Registro',
                    text: 'El usuario ya está registrado. Intenta con otro correo electrónico.'
                });
            } else {
                usuarioNuevoRegistrado.push(newUser);
                localStorage.setItem("Registro", JSON.stringify(usuarioNuevoRegistrado))
                console.log("Usuario registrado:", newUser);
                console.log("Todos los usuarios registrados:", usuarioNuevoRegistrado);
                const formulario = document.getElementById('formularioDeRegistro');
                formulario.reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    text: 'El usuario se ha registrado correctamente. Te vamos a direccionar al logueo'
                });            
                setTimeout(() => {
                    window.location.href = '../Html/login.html';}, 2000);
            }
        }