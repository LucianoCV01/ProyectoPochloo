const usuarioNuevoRegistrado = [];

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
  usuarioNuevoRegistrado.push(newUser);
  console.log("Usuario registrado:", newUser);
  console.log("Todos los usuarios registrados:", usuarioNuevoRegistrado);
  const formulario = document.getElementById('formularioDeRegistro');
  formulario.reset()
  Swal.fire({
    icon: 'success',
    title: 'Registro exitoso',
    text: 'El usuario se ha registrado correctamente.'}
  )}

  export default usuarioNuevoRegistrado