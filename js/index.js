const peliculas = JSON.parse(localStorage.getItem("Pelicula"));
const arrayDeArraysPorCategoria = peliculas.reduce((acumulador, pelicula) => {
  if (pelicula.publicado) {
    const categoriaExistente = acumulador.find(arr => arr[0].categoria === pelicula.categoria);

    if (categoriaExistente) {
      categoriaExistente.push(pelicula);
    } else {
      acumulador.push([pelicula]);
    }
  }
  return acumulador;
}, []);

//OBTENGO EL ID DEL CONTENEDOR DE TODOS LOS CARRUSELES
const carruselesPorCategoria = document.getElementById("categoria");
let carruseles = '';
//RECORRO EL ARRAY DE ARRAYS DIVIDIDO POR CATEGORIAS
if (arrayDeArraysPorCategoria != null) {
  arrayDeArraysPorCategoria.forEach(arrayCategoria => {
    if (arrayCategoria.length < 6) return
    //NOMBRE DE LA CATEGORIA
    const nombreCategoria = '<h1 class="tituloCategoria display-5 mt-4 mb-0 fw-bolder ps-3">' + arrayCategoria[0].categoria + '</h1>'
    //COMIENZO DE PAGINACION
    const carruselInicio = '<!-- COMIENZO DE PAGINACION --> <div id="' + arrayCategoria[0].categoria + '" class="carousel slide" data-bs-touch="true">';
    const contenedorItemsCarruselInicio = ' <div class="carousel-inner"> ';
    let conjuntoCarruselItem = "";
    let carruselPorCategoria = "";
    for (x = 0; x < arrayCategoria.length; x++) {
      //COMIENZO DE CADA ITEM DEL CARRUSEL
      if (arrayCategoria.length - x < 6) break;
      let index = x
      let carruselItemInicio = ''
      let conjuntoCard = "";
      let carruselItem = "";
      if (x === 0) {
        carruselItemInicio = '<div class="carousel-item  active"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">'
      }
      else {
        carruselItemInicio = '<div class="carousel-item"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">'
      }
      for (y = 0; y < 6; y++) {
        //COMIENZO DE LA CARD
        const cardInicio = '<div class="col px-2"><a href="detallePelicula.html" target="_blank" onclick="seleccionarPelicula(' + arrayCategoria[x].codigo + ')">  <div class="card h-100">'
        //URL DE LA PELICULA
        const cardUrlEImagen = '<img class="" src="' + arrayCategoria[x].imagen + '" class="card-img-top" alt="Imagen de la pelicula ' + arrayCategoria[x].nombre + '">'
        //ETIQUETAS NECESARIAS
        // carruselesPorCategoria.innerHTML += '<div class="col"> <div class="card h-100">'
        // //IMAGEN DE LA PELICULAS
        // carruselesPorCategoria.innerHTML += '<img class="m-3" src="'+arrayCategoria[y].imagen+'" class="card-img-top" alt="Imagen de la pelicula'+arrayCategoria[y].nombre+'">'
        // //CUERPO DE LA CARTA
        // const cardCuerpo = '<div class="card-body">'
        // //BOTONES DEL CUERPO (HOVER)
        // const cardCuerpoTitulo = '<h5 class="card-title text-truncate"></h5>'
        // //TEXTO DEL CUERPO
        // const cardCuerpoTexto = '<p class="card-text text-truncate"></p>'
        //CIERRE DE CARD
        const cardFin = ' </div> </a> </div>'
        const card = cardInicio + cardUrlEImagen + cardFin
        conjuntoCard = conjuntoCard + card;
        x++;
      }
      x--
      //FIN DE CADA ITEM DEL CARRUSEL
      const carruselItemFin = '</div> </div>'
      carruselItem = carruselItemInicio + conjuntoCard + carruselItemFin;
      conjuntoCarruselItem = conjuntoCarruselItem + carruselItem;
    }
    const contenedorCarruselesFin = '</div>'
    //ETIQUETAS PARA CIERRE DEL CARRUSEL
    const carruselFin = '<button class="carousel-control-prev carouselControl" type="button" data-bs-target="#' + arrayCategoria[0].categoria + '" data-bs-slide="prev"> <i class="fas fa-arrow-left fa-lg" style="color: #BE3144;"></i> <span class="visually-hidden">Previous</span> </button> <button class="carousel-control-next carouselControl" type="button" data-bs-target="#' + arrayCategoria[0].categoria + '" data-bs-slide="next"> <i class="fas fa-arrow-right fa-lg" style="color: #BE3144;"></i> <span class="visually-hidden">Next</span> </button> </div>'
    carruselPorCategoria = nombreCategoria + carruselInicio + contenedorItemsCarruselInicio + conjuntoCarruselItem + contenedorCarruselesFin + carruselFin
    carruseles = carruseles + carruselPorCategoria;
  })
};
carruselesPorCategoria.innerHTML = carruseles;

const obtenerPeliculaDestacada = () => {
  let peliculaDestacada = peliculas.find(pelicula => pelicula.destacado == true)
  if (!peliculaDestacada || !peliculaDestacada.publicado) {
    peliculaDestacada = peliculas[Math.floor(Math.random() * (peliculas.length + 1))]
  }
  return peliculaDestacada
}

//PELICULA DESTACADA
const peliculaDestacada = document.getElementById("peliculaDestacada")
const nombrePeliculaDestacada = document.getElementById("nombrePeliculaDestacada")
const descripcionPeliculaDestacada = document.getElementById("descripcionPeliculaDestacada")
const reproducirPeliculaDestacada = document.getElementById("reproducirPeliculaDestacada")
const logoDestacado = document.getElementById("logoDestacado")
const datosPeliculaDestacada = document.getElementById("datosPeliculaDestacada")

const peliculaDestacadaDatos = obtenerPeliculaDestacada();
peliculaDestacada.style = `background-image: linear-gradient(
                                              to right,
                                              rgba(0, 0, 0, 1),
                                              rgba(0, 0, 0, 0.4),
                                              rgba(0, 0, 0, 0.25),
                                              rgba(0, 0, 0, 0)
                                            ),  
                                            url(${peliculaDestacadaDatos.imagenDestacado});`

//MOSTRAR LOGO O TITULO DE LA PELICULA DESTACADA
if (peliculaDestacadaDatos.logo != "") {
  logoDestacado.src = peliculaDestacadaDatos.logo
  logoDestacado.alt = `Logo de la pelicula ${peliculaDestacadaDatos.nombre}`
} else {
  const tituloPeliculaDestacada = document.createElement('h1');
  tituloPeliculaDestacada.id = "nombrePeliculaDestacada";
  tituloPeliculaDestacada.textContent = peliculaDestacadaDatos.nombre.toUpperCase()
  datosPeliculaDestacada.insertBefore(tituloPeliculaDestacada, logoDestacado);
}

descripcionPeliculaDestacada.textContent = peliculaDestacadaDatos.descripcion
reproducirPeliculaDestacada.addEventListener("click", (event) => {
  event.preventDefault();
  window.open(peliculaDestacadaDatos.url).focus
})

function seleccionarPelicula(codigoPelicula) {
  localStorage.setItem("peliculaSeleccionada", codigoPelicula);
}