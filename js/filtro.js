const sectionFiltros = document.getElementById("sectionFiltros")

let filtro = JSON.parse(localStorage.getItem("Buscar"))
let peliculas = JSON.parse(localStorage.getItem("Pelicula"))

let article = document.createElement("article")
let divh1 = document.createElement("div")
let h1 = document.createElement("h1")

let buscado = filtro[0]
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


const ordenarPorRelevancia = (arrayOrdenados) => {

    if (arrayOrdenados.length > 0) {
        arrayOrdenados.sort((a, b) => (a.palabra - b.palabra))

        for (let i = 0; i < arrayOrdenados.length; i++) {

            construirMaquetado(peliculas[arrayOrdenados[i].orden])
        }
    }else{
        let div = document.createElement("div")
        div.className = "m-auto m-sm-auto"
        div.textContent = 'No se encontraron películas con la referencia "' + buscado + '" :('
        article.appendChild(div)
    }

}


const mostrarPeliculasPorCategoria = () => {
    h1.textContent = 'Mostrando películas de "' + buscado + '"'
    divh1.appendChild(h1)
    sectionFiltros.appendChild(divh1)

    peliculas.forEach(pelicula => {
        if (buscado == pelicula.categoria) {
            construirMaquetado(pelicula)
        }

    });
}


const mostrarPeliculasPorBuscador = () => {
    let arrayOrdenados = []
    class Unidad {
        constructor(palabra, orden) {
            this.palabra = palabra,
                this.orden = orden
        }
    }

    h1.textContent = 'Mostrando resultados para "' + buscado + '"'
    divh1.appendChild(h1)
    sectionFiltros.appendChild(divh1)

    peliculas.forEach((pelicula, index) => {
        let nombre = pelicula.nombre.toLowerCase()

        if (nombre.startsWith(buscado)) {
            arrayOrdenados.push(new Unidad(0, index))
        } else {
            let arregloPorPalabra = nombre.split(" ")

            for (let i = 0; i < arregloPorPalabra.length; i++) {
                if (arregloPorPalabra[i].startsWith(buscado.toLowerCase()) && arregloPorPalabra[i].length > 3) {
                    arrayOrdenados.push(new Unidad(i, index))
                    i = arregloPorPalabra.length
                }

            }
        }
    })
    ordenarPorRelevancia(arrayOrdenados)
}


if (clave == "categoria") {
    mostrarPeliculasPorCategoria()
} else {
    mostrarPeliculasPorBuscador()

}


sectionFiltros.appendChild(article)
