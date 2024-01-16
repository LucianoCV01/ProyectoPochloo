const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

function registroDeUsuarios() {
  const name = document.getElementById('nombre').value;
  const lastname = document.getElementById('apellido').value;
  const mail = document.getElementById('inputEmail').value;
  const pass = document.getElementById('inputPassword').value;
  console.log(name, lastname, mail, pass)
} registroDeUsuarios()