const usuarioNuevoRegistrado = [];
export default usuarioNuevoRegistrado

document.getElementById('botonDeRegistro').addEventListener('click', function(event) {
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
  const newUser = {
    nombre: name,
    apellido: lastname,
    email: mail,
    clave: pass,
    tipo: Comun,
    estado: Pendiente
  };
  fetch("../json/fakeApiEnzo.json")
    .then(response => response.json())
    .then(users => {
      const usuarioExistente = users.find(usuario => usuario.email === mail);
      if (usuarioExistente) {
        Swal.fire({
          icon: 'error',
          title: 'Error de registro a Pochloo',
          text: 'El usuario ya está registrado. Intenta con otro correo electrónico.'
        });
      } else {
        usuarioNuevoRegistrado.push(newUser);
        console.log("Usuario registrado:", newUser);
        console.log("Todos los usuarios registrados:", usuarioNuevoRegistrado);
        const formulario = document.getElementById('formularioDeRegistro');
        formulario.reset();
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El usuario se ha registrado correctamente.'
        });
      }
    })
    .catch(error => {
      console.error("Error al obtener los datos de la API:", error);
    });
}
