const sectionPeliculas = document.getElementById("peliculasPorCategoria")

let seleccion = localStorage.getItem("Categoria")

let peliculas = JSON.parse(localStorage.getItem("Pelicula"))


let h2 = document.createElement("h2")
h2.textContent = 'Mostrando películas de "' + seleccion + '"'
sectionPeliculas.appendChild(h2)


for (let i = 0; i < peliculas.length; i++) {
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
