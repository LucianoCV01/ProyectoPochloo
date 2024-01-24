let sectionBusqueda = document.getElementById("sectionBusqueda")

let busqueda = localStorage.getItem("Busqueda").toLowerCase()
let peliculas = JSON.parse(localStorage.getItem("Pelicula"))

for (let i = 0; i < peliculas.length; i++) {
    if(peliculas[i].nombre.toLowerCase().startsWith(busqueda))
    {
        let div = document.createElement("div")
        div.textContent = peliculas[i].nombre
        sectionBusqueda.appendChild(div)
    }
}


if(sectionBusqueda.childNodes.length < 2)
{
    let div = document.createElement("div")
    div.textContent = 'No se encontraron resultados para la busqueda ' + '"' + busqueda + '"'
    sectionBusqueda.appendChild(div)
}