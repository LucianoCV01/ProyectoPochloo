const bodyAlta = document.getElementById("bodyAlta")

import registro from "./exportRegistro.js";

import usuario from "./exportUsuario.js"


const aceptarAlta = (i) =>
{
    Swal.fire({
        title: "¿Aceptar al usuario " + registro[i].usuario + "?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Aceptar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Aceptado!",
            text: "La acción se completó exitosamente",
            icon: "success"
          });
        registro[i].estado = "Aceptado"
        registro.push(registro[i])
        registro.splice(i, 1)
        localStorage.setItem("Registro", JSON.stringify(registro))
        mostrarUsuariosEnTabla()
        }
      });
    
}

const rechazarAlta = (i) =>
{
    Swal.fire({
        title: "¿Rechazar al usuario " + registro[i].usuario + "?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Rechazar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Rechazado!",
            text: "La acción se completó exitosamente",
            icon: "success"
          });
          registro[i].estado = "Rechazado"
          registro.push(registro[i])
          registro.splice(i, 1)
          localStorage.setItem("Registro", JSON.stringify(registro))
          mostrarUsuariosEnTabla()
        }
      });
}

const crearFilasAlta = (usuario, indice) => {
    
    const fila = document.createElement("tr");
    
    if(registro[indice].estado === "Aceptado")
    {
        fila.style.backgroundColor = "#5cb65e"
    }else{
        if (registro[indice].estado === "Rechazado") {
            fila.style.backgroundColor = "#d9534f"
        }
    }

    const celdaUsuario = document.createElement("td");
    celdaUsuario.textContent = usuario.usuario;
    
    const celdaEstado = document.createElement("td");
    celdaEstado.textContent = usuario.estado;
    
    const celdaBotones = document.createElement("td");
    
    if (registro[indice].estado === "Pendiente") {
        const botonAceptar = document.createElement("button");
        botonAceptar.className = "col-4 col-sm-3 m-1 btn btn-success";
        botonAceptar.addEventListener("click", () => aceptarAlta(indice));
        botonAceptar.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    
        const botonRechazar = document.createElement("button");
        botonRechazar.className = "col-4 col-sm-3 btn m-1 btn-danger";
        botonRechazar.addEventListener("click", () => rechazarAlta(indice));
        botonRechazar.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';

        celdaBotones.appendChild(botonAceptar);
        celdaBotones.appendChild(botonRechazar);
    
    }else{
        celdaBotones.textContent = "-"
    }
    
    fila.appendChild(celdaUsuario);
    fila.appendChild(celdaEstado);
    fila.appendChild(celdaBotones);

    console.log("sucede crearFilasAlta");
    return fila;
};


const mostrarUsuariosEnTabla = () =>
{ 
    bodyAlta.innerHTML = ""
    for (let i = 0; i < registro.length; i++) {
        
        let filaAlta = crearFilasAlta(registro[i], i)
        bodyAlta.appendChild(filaAlta)
    }

    console.log("sucede mostrarALtaEnTabla")
}

mostrarUsuariosEnTabla()
