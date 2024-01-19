const sectionPeliculas = document.getElementById("peliculasPorCategoria")
let seleccion = localStorage.getItem("Categoria")

let peliculas = []
// let seleccionLowerCase = seleccion.toLowerCase()

peliculas = JSON.parse(localStorage.getItem("Pelicula"))
for (let i = 0; i < peliculas.length; i++) {
    // let categoriaLowerCase = peliculas[i].categoria.toLowerCase()
    if(seleccion.toLowerCase() === peliculas[i].categoria.toLowerCase())
    {
        let div = document.createElement("div")
        let img = document.createElement("img")
        img.src = peliculas[i].imagen
        img.alt = "Portada de la película " + peliculas[i].nombre
        div.appendChild(img)
        sectionPeliculas.appendChild(div)
    }
}
