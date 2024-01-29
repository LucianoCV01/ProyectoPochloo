function verificarUsuario() {
    const email = document.getElementById('InputEmail').value;
    if (email === '' || !email.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un correo electrónico válido.'
        });
        return;
    }
    fetch("../json/fakeApiEnzo.json")
        .then(response => response.json())
        .then(users => {
            const usuarioEncontrado = users.find(usuario => usuario.email === email);
            if (usuarioEncontrado) {
                enviarMaildeRecupero();
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario Encontrado',
                    text: 'Se te ha enviado un mail, sigue los pasos para recuperar tu cuenta'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario No Encontrado',
                    text: 'El usuario no está registrado en el sistema.'
                });
            }
        })
        .catch(error => {
            console.error("Error de la API", error);
        });
}

function enviarMaildeRecupero() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "enzocastro110@gmail.com",
        Password: "57ABA6E8B636166C5E39FF8D44E96598D009",
        To: 'enzocastro110@icloud.com',
        From: "enzocastro110@gmail.com",
        Subject: "Recupero de contraseña",
        Body: "Sigue los pasos para recuperar tu contraseña:"
    }).then();
}