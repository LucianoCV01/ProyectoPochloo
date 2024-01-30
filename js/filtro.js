//DECLARACIÓN DE VARIABLES Y CONSTANTES GLOBALES 
const sectionFiltros = document.getElementById("sectionFiltros")

let filtro = JSON.parse(localStorage.getItem("Buscar"))
let peliculas = JSON.parse(localStorage.getItem("Pelicula"))

let article = document.createElement("article")
let divh1 = document.createElement("div")
let h1 = document.createElement("h1")

let buscado = filtro[0]
let clave = filtro[1]


//AGREGADO DE CLASES DE ESTILO PARA LAS VARIABLES GLOBALES
divh1.className = "justify-content-start p-4"
article.className = "d-flex flex-column flex-md-row flex-wrap justify-md-content-evenly"


//FUNCIÓN PARA TRANSFORMAR CUALQUIER STRING A MINÚSCULAS Y SIN CARACTERES ESPECIALES
const transformarString = (palabra) => {
    palabra = palabra.toLowerCase()
    let transformado = ""

    for (let i = 0; i < palabra.length; i++) {
        switch (palabra[i]) {
            case "á": 
            case "ä": 
            case "ã":
                transformado += "a"
                break
            case "é":
            case "ë":
            case "ê":
                transformado += "e"
                break
            case "í":
            case "ï":
            case "î":
                transformado += "i"
                break
                case "ó": 
                case "ö": 
                case "õ":
                transformado += "o"
                break
            case "ú":
            case "ü":
            case "û":
                transformado += "u"
                break
            default:     
                transformado += palabra[i]
        }
    }

    return transformado

}


//FUNCIÓN PARA PREPARAR Y MOSTRAR LA MAQUETA Y EL ESTILO DE LA PELÍCULA QUE SE IRÁ A MOSTRAR (SI ES QUE HAY PELICULAS A MOSTRAR)
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


//FUNCIÓN PARA ORDENAR LAS PELÍCULAS QUE SE HAN BUSCADO SEGÚN LA POSICIÓN DE LA PALABRA COINCIDENTE EN EL NOMBRE DE LA PELÍCULA
const ordenarPorRelevancia = (arrayOrdenados) => {

    if (arrayOrdenados.length > 0) {
        arrayOrdenados.sort((a, b) => (a.palabra - b.palabra))

        for (let i = 0; i < arrayOrdenados.length; i++) {

            construirMaquetado(peliculas[arrayOrdenados[i].orden])
        }
    } else {
        let div = document.createElement("div")
        div.className = "m-auto m-sm-auto"
        div.textContent = 'No se encontraron películas con la referencia "' + buscado + '" :('
        article.appendChild(div)
    }

}


//FUNCIÓN QUE PREPARA EL TÍTULO DE PÁGINA PARA MOSTRAR LAS PELÍCULAS SEGÚN CATEGORÍA Y LLAMA A CREAR EL MAQUETADO 
const encontrarPeliculaPorCategoria = () => {
    h1.textContent = 'Mostrando películas de "' + buscado + '"'
    divh1.appendChild(h1)
    sectionFiltros.appendChild(divh1)

    peliculas.forEach(pelicula => {
        if (buscado == pelicula.categoria) {
            construirMaquetado(pelicula)
        }

    });
}


//FUNCIÓN PARA ENCONTRAR PELÍCULAS QUE TENGAN ALGUNA COINCIDENCIA A LO BUSCADO Y PREPARA EL TÍTULO
const encontrarPeliculaPorBusqueda = () => {
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
        let nombre = transformarString(pelicula.nombre)
        buscado = transformarString(buscado)

        if (nombre.startsWith(buscado)) {
            arrayOrdenados.push(new Unidad(0, index))
        } else {
            let arregloPorPalabra = nombre.split(" ")

            for (let i = 0; i < arregloPorPalabra.length; i++) {
                if (arregloPorPalabra[i].startsWith(buscado) && arregloPorPalabra[i].length > 3) {
                    arrayOrdenados.push(new Unidad(i, index))
                    i = arregloPorPalabra.length
                }

            }
        }
    })
    ordenarPorRelevancia(arrayOrdenados)
}


//CONDICIONAL QUE ACTIVA LA FUNCIÓN CORRESPONDIENTE AL TIPO DE BUSCADO, CATEGORIA O BUSCADOR
if (clave == "categoria") {
    encontrarPeliculaPorCategoria()
} else {
    encontrarPeliculaPorBusqueda()

}

//SE AGREGA EL ARTÍCULO QUE CONTENDRÁ LAS PELÍCULAS (EN EL CASO QUE SE HAYAN ENCONTRADO) AL SECTION GENERAL DE LA PÁGINA (CONSTANTE PREVIAMENTE DECLARADA)
sectionFiltros.appendChild(article)
