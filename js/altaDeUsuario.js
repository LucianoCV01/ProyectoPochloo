const bodyAlta = document.getElementById("bodyAlta")

import registro from "./exportRegistro.js";

import usuario from "./exportUsuario.js"


//FUNCIÓN PARA AGREGAR LOS USUARIOS APROBADOS AL ARREGLO DE USUARIOS QUE YA PUEDEN LOGUEARSE
const agregarUsuarioAprobado = (aprobado) =>
{
    usuario.push(aprobado)
    console.log(usuario)
}


//FUNCIÓN QUE SE EJECUTA AL APRETAR EL BOTÓN DE ACEPTAR USUARIO. CAMBIA SU ESTADO A "ACEPTADO"
const aprobarAlta = (i) =>
{
    Swal.fire({
        title: "¿Aprobar al usuario " + registro[i].usuario + "?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, aprobar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Aprobado!",
            text: "La acción se completó exitosamente",
            icon: "success"
          });
        registro[i].estado = "Aprobado"
        agregarUsuarioAprobado(registro[i])
        registro.push(registro[i])
        registro.splice(i, 1)
        localStorage.setItem("Registro", JSON.stringify(registro))
        
        mostrarUsuariosEnTabla()
        
        }
      });
    
}

//FUNCIÓN QUE SE EJECUTA AL APRETAR EL BOTÓN DE SUSPENDER USUARIO. CAMBIA SU ESTADO A "RECHAZADO"
const suspenderAlta = (i) =>
{
    Swal.fire({
        title: "¿Suspender al usuario " + registro[i].nombre + " "+ registro[i].apellido + "?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, suspender"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Suspendido!",
            text: "La acción se completó exitosamente",
            icon: "success"
          });
          registro[i].estado = "Suspendido"
          registro.push(registro[i])
          registro.splice(i, 1)
          localStorage.setItem("Registro", JSON.stringify(registro))
          mostrarUsuariosEnTabla()
        }
      });
}

//FUNCIÓN CREADORA DE LAS FILAS DE LAS TABLAS, AGREGANDO INFORMACIÓN DE CADA REGISTRADO Y DOS BOTONES PARA APROBAR Y SUSPENDER SOLICITUD CON SUS RESPECTIVOS EVENTOS
const crearFilasAlta = (usuario, indice) => {
    
    const fila = document.createElement("tr");
    
    if(registro[indice].estado === "Aprobado")
    {
        fila.style.backgroundColor = "#5cb65e"
    }else{
        if (registro[indice].estado === "Suspendido") {
            fila.style.backgroundColor = "#d9534f"
        }
    }

    
    const celdaUsuario = document.createElement("td");
    celdaUsuario.textContent = usuario.nombre + " " + usuario.apellido
    celdaUsuario.className = "p-4"
    
    const celdaEmail = document.createElement("td")
    celdaEmail.textContent = usuario.email
    

    const celdaEstado = document.createElement("td")
    celdaEstado.textContent = usuario.estado
    
    const celdaBotones = document.createElement("td")
    
    const divBotones = document.createElement("div")
    
    if (registro[indice].estado === "Pendiente") {
        const botonAprobar = document.createElement("button")
        botonAprobar.className = "col-9 col-sm-6 col-md-4 m-1 btn btn-success"
        botonAprobar.addEventListener("click", () => aprobarAlta(indice))
        botonAprobar.innerHTML = '<i class="fa-regular fa-circle-check"></i>'
    
        const botonSuspender = document.createElement("button")
        botonSuspender.className = "col-9 col-sm-6 col-md-4 btn m-1 btn-danger"
        botonSuspender.addEventListener("click", () => suspenderAlta(indice))
        botonSuspender.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'

        divBotones.appendChild(botonAprobar)
        divBotones.appendChild(botonSuspender)

        celdaBotones.appendChild(divBotones)
    
    }else{
        celdaBotones.textContent = "-"
    }
    
    fila.appendChild(celdaUsuario)
    fila.appendChild(celdaEmail)
    fila.appendChild(celdaEstado)
    fila.appendChild(celdaBotones)

    return fila;
};

//FUNCIÓN PARA MOSTRAR LAS FILAS CREADAS 
const mostrarUsuariosEnTabla = () =>
{ 
    bodyAlta.innerHTML = ""
    for (let i = 0; i < registro.length; i++) {
        let filaAlta = crearFilasAlta(registro[i], i)
        bodyAlta.appendChild(filaAlta)
    }
}

mostrarUsuariosEnTabla()
