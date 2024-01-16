document.getElementById('botonDeRegistro').addEventListener('click', function(event) {
  event.preventDefault();
  registroDeUsuarios();
});

function registroDeUsuarios() {
  const name = document.getElementById('nombre').value;
  const lastname = document.getElementById('apellido').value;
  const mail = document.getElementById('inputEmail').value;
  const pass = document.getElementById('inputPassword').value;
  console.log(name, lastname, mail, pass);
}

