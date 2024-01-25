const sectionPeliculas = document.getElementById("peliculasPorCategoria")

let seleccion = localStorage.getItem("Categoria")
let peliculas = JSON.parse(localStorage.getItem("Pelicula"))

let article = document.createElement("article")

article.className = "d-flex flex-column flex-md-row flex-wrap justify-md-content-evenly "

let divh1 = document.createElement("div")
divh1.className = "justify-content-start p-4"
let h1 = document.createElement("h1")
h1.textContent = 'Mostrando películas de "' + seleccion + '"'
divh1.appendChild(h1)
sectionPeliculas.appendChild(divh1)


for (let i = 0; i < peliculas.length; i++) {
    if(seleccion.toLowerCase() === peliculas[i].categoria.toLowerCase())
    {
        let div = document.createElement("div")
        let nombre = document.createElement("h3")
        let a = document.createElement("a")
        let img = document.createElement("img")

        nombre.textContent = peliculas[i].nombre
        nombre.className = "ps-2 pb-5 pt-2"

        div.className = "col-md-6 d-flex flex-column align-items-center"

        a.href = "../html/detalle.html"

        img.src = peliculas[i].imagen
        img.alt = "Portada de la película " + peliculas[i].nombre
        img.id ="imgCategoria"

        a.appendChild(img)
        div.appendChild(a)
        div.appendChild(nombre)
        article.appendChild(div)
    }
}

sectionPeliculas.appendChild(article)
