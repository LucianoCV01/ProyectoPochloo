const tbody = document.getElementById("tbody")


import arregloPeliculas  from "./export.js"



const mostrarPeliculasEnTabla = () =>
{
    tbody.innerHTML = ""
    for (let i = 0; i < arregloPeliculas.length; i++) {

        let tr = document.createElement("tr")

        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let td5 = document.createElement("td")
        let td6 = document.createElement("td")

        let div = document.createElement("div")

        let i1 = document.createElement("i")
        let i2 = document.createElement("i")
        let i3 = document.createElement("i")

        let b1 = document.createElement("button")
        let b2 = document.createElement("button")
        let b3 = document.createElement("button")

        
        i1.classList.add("fa-solid", "fa-trash")
        i2.classList.add("fa-solid", "fa-pen-to-square")

        if(arregloPeliculas[i].destacado)
        {
            i3.classList.add("fa-solid", "fa-star")
        }else{
            i3.classList.add("fa-regular", "fa-star")
        }

        b1.classList.add("btnEliminar")
        b2.classList.add("btnModificar")
        b3.classList.add("btnDestacar")

        b1.appendChild(i1)
        b2.appendChild(i2)
        b3.appendChild(i3)

        div.appendChild(b1)
        div.appendChild(b2)
        div.appendChild(b3)
        
        td1.textContent = arregloPeliculas[i].codigo
        td2.textContent = arregloPeliculas[i].nombre
        td3.textContent = arregloPeliculas[i].categoria
        td4.textContent = arregloPeliculas[i].detalles
        if(arregloPeliculas[i].publicado)
        {
            td5.textContent = "Sí"
        }else{
            td5.textContent = "No"
        }
        
        td6.appendChild(div)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tbody.appendChild(tr)

        b1.addEventListener("click", () => {eliminarPelicula(i)})
    }
}

mostrarPeliculasEnTabla()

const eliminarPelicula = (posicion) =>
{
    arregloPeliculas.splice(posicion, 1)
    console.log(arregloPeliculas)
    localStorage.setItem("Pelicula", JSON.stringify(arregloPeliculas))
    mostrarPeliculasEnTabla()
}




