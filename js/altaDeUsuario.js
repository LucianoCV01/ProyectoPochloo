const bodyAlta = document.getElementById("bodyAlta")

import registro from "./exportAlta.js";



const aceptarAlta = (i) =>
{
    registro[i].estado = "Aceptado"
    localStorage.setItem("Registro", JSON.stringify(registro))
    mostrarUsuariosEnTabla()
    console.log("sucede aceptarAlta")
}

const rechazarAlta = (i) =>
{
    registro[i].estado = "Rechazado"
    localStorage.setItem("Registro", JSON.stringify(registro))
    mostrarUsuariosEnTabla()
    console.log("Sucede rechazarAlta")
}

const crearFilasAlta = (usuario, indice) => {
    
    const fila = document.createElement("tr");
    
    const celdaUsuario = document.createElement("td");
    celdaUsuario.textContent = usuario.usuario;
    
    const celdaEstado = document.createElement("td");
    celdaEstado.textContent = usuario.estado;
    
    const celdaBotones = document.createElement("td");
    
    const botonAceptar = document.createElement("button");
    botonAceptar.className = "col-2";
    botonAceptar.addEventListener("click", () => aceptarAlta(indice));
    botonAceptar.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    
    const botonRechazar = document.createElement("button");
    botonRechazar.className = "col-2";
    botonRechazar.addEventListener("click", () => rechazarAlta(indice));
    botonRechazar.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';

    celdaBotones.appendChild(botonAceptar);
    celdaBotones.appendChild(botonRechazar);
    
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



// const cambiarIcono = (event) =>
// {
//     let botonApretado = event.target

//         if(botonApretado.id === "aceptarAlta")
//         {
//            botonApretado.innerHTML = ""
//            botonApretado.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
//         }else{
//            botonApretado.innerHTML = ""
//            botonApretado.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`
//         }
    

//     console.log("sucede cambiarIcono")
// }