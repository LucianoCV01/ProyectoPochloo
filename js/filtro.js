const sectionFiltros = document.getElementById("sectionFiltros")

let filtro = JSON.parse(localStorage.getItem("Buscar"))
let peliculas = JSON.parse(localStorage.getItem("Pelicula"))

let article = document.createElement("article")
let divh1 = document.createElement("div")
let h1 = document.createElement("h1")

let buscado = filtro[0].toLowerCase()
let clave = filtro[1]

divh1.className = "justify-content-start p-4"
article.className = "d-flex flex-column flex-md-row flex-wrap justify-md-content-evenly"

const construirMaquetado = (pelicula) => {

    let div = document.createElement("div")
    let nombre = document.createElement("h3")
    let a = document.createElement("a")
    let img = document.createElement("img")

    nombre.textContent = pelicula.nombre
    nombre.className = "ps-2 pb-5 pt-2"

    div.className = "col-md-6 d-flex flex-column align-items-center"

    a.href = "../html/detalle.html"

    img.src = pelicula.imagen
    img.alt = "Portada de la película " + pelicula.nombre
    img.id = "imgCategoria"

    a.appendChild(img)
    div.appendChild(a)
    div.appendChild(nombre)
    article.appendChild(div)
}



const mostrarPeliculasPorCategoria = () => {
    h1.textContent = 'Mostrando películas de "' + buscado + '"'
    divh1.appendChild(h1)
    sectionFiltros.appendChild(divh1)

    peliculas.forEach(pelicula => {
        if (buscado == pelicula.categoria)
        {
            construirMaquetado(pelicula)
        }
            
    });

}

const mostrarPeliculasPorBuscador = () => {
    h1.textContent = 'Mostrando resultados para "' + buscado + '"'
    divh1.appendChild(h1)
    sectionFiltros.appendChild(divh1)

    peliculas.forEach(pelicula => {
        let nombre = pelicula.nombre.toLowerCase()
        let arregloPorPalabra = nombre.split(" ")
        console.log(arregloPorPalabra)
        for (let i = 0; i < arregloPorPalabra.length; i++) {
            if(arregloPorPalabra[i].startsWith(buscado) && arregloPorPalabra[i].length > 3)
            {
                construirMaquetado(pelicula)
                i = arregloPorPalabra.length
            }
            
        }
        })
}

if (clave == "categoria") {
    mostrarPeliculasPorCategoria()
    console.log("funciona categoria")
} else {
    mostrarPeliculasPorBuscador()
    console.log("sde")
}








// for (let i = 0; i < peliculas.length; i++) {
//     if(seleccion.toLowerCase() === peliculas[i].categoria.toLowerCase())
//     {
//         let div = document.createElement("div")
//         let nombre = document.createElement("h3")
//         let a = document.createElement("a")
//         let img = document.createElement("img")

//         nombre.textContent = peliculas[i].nombre
//         nombre.className = "ps-2 pb-5 pt-2"

//         div.className = "col-md-6 d-flex flex-column align-items-center"

//         a.href = "../html/detalle.html"

//         img.src = peliculas[i].imagen
//         img.alt = "Portada de la película " + peliculas[i].nombre
//         img.id ="imgCategoria"

//         a.appendChild(img)
//         div.appendChild(a)
//         div.appendChild(nombre)
//         article.appendChild(div)
//     }
// }

sectionFiltros.appendChild(article)
