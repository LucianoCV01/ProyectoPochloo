let buscador = document.getElementById("buscador")
let btnBuscar = document.getElementById("btnBuscar")
let main = document.getElementById("main")

let peliculas = JSON.parse(localStorage.getItem("Pelicula"))


btnBuscar.addEventListener("click", function(event)
{ 
    event.preventDefault()
    let section = document.createElement("section")
    let buscado = buscador.value
   
    for (let i = 0; i < peliculas.length; i++) {
        if(peliculas[i].nombre.startsWith(buscado))
        {
            let img = document.createElement("img")
            img.src = peliculas[i].imagen
            img.alt = "Portada de la película" + peliculas[i].nombre
            section.appendChild(img)
        }
    }
    main.appendChild(section)
})
