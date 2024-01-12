const bodyAlta = document.getElementById("bodyAlta")

import registro from "./exportAlta.js";


const crearFilasAlta = (usuario, indice) =>
{
    console.log("sucede crearFilasAlta")
    return `
        <tr>
            <td>${usuario.nombre}</td>
            <td>Pendiente</td>
            <td>
            <div>
            <button id="aceptarAlta" onfocus="cambiarIcono(event)" onclick="estadoDeAlta(${indice})">
            <i class="fa-regular fa-user-check"></i>
            </button>
            <button id="rechazarAlta" onfocus="cambiarIcono(event)" onclick="estadoDeAlta(${indice})">
            <i class="fa-regular fa-user-xmark"></i>
            </button>
            </td>
        </tr>
    `;

    
}

const mostrarAltaEnTabla = () =>
{
    // bodyAlta.innerHTML = ""
    for (let i = 0; i < registro.length; i++) {
        
        let filaAlta = crearFilasAlta(registro[i], i)
        bodyAlta.innerHTML += filaAlta
    }
    console.log("sucede mostrarALtaEnTabla")
}

mostrarAltaEnTabla()

const cambiarIcono = (event) =>
{
    let botonApretado = event.target

    if(botonApretado.id = "aceptarAlta")
    {
        botonApretado.innerHTML = ""
        botonApretado.innerHTML = `<i class="fa-solid fa-user-check"></i>`
    }else{
        botonApretado.innerHTML = ""
        botonApretado.innerHTML = `<i class="fa-solid fa-user-xmark"></i>`
    }

    console.log("sucede cambiarIcono")
}