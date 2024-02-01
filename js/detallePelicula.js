// const idPelicula = localStorage.getItem('peliculaSeleccionada');
// console.log('ID de la película seleccionada:', idPelicula);
const idPelicula = 2;

const leerLocalStorage = (nombreLocalStorage) => {
    let arregloObjetos = JSON.parse(localStorage.getItem(nombreLocalStorage));
    if (arregloObjetos === null) {
        arregloObjetos = [];
    }
    return arregloObjetos;
};
const obtenerPelicula = (codigoPeli) => {
    const productos = leerLocalStorage("Pelicula");
    const peliculaBuscada = productos.find(producto => producto.codigo === codigoPeli);
    return peliculaBuscada;
};

const mostrarPelicula = () => {
    const pelicula = obtenerPelicula(idPelicula);
    const detallePeli = document.getElementById("detallePeli");

    detallePeli.innerHTML += `           <div class="row">
    <div class="p-0 col-md-6 order-md-1 order-1 d-flex align-items-center justify-content-center">
        <img class="img-fluid opacity-75" src="${pelicula.imagen}" alt="Imagen de la película ${pelicula.nombre}">
    </div>
    <div class="col-md-6 order-md-2 order-2">
        <div class="p-3">
            <h1 class="mt-2">${pelicula.nombre}</h1>
            <span
                class="badge rounded-pill text-bg-secondary mt-2 mb-4 custom-font-size">${pelicula.categoria}</span>
            <p>${pelicula.descripcion}</p>
            <a href="${pelicula.url}" target="_blank" rel="noopener noreferrer">
                <button class="btn btn-custom"><i class="fa-solid fa-play"></i> Reproducir</button>
            </a>
        </div>
    </div>
</div>`;
};

mostrarPelicula();
const peliculasRecomendadas = () => {
    let peliculas = leerLocalStorage("Pelicula");
    const peliculaSeleccionada = obtenerPelicula(idPelicula);
    const peliculasRecomendadas = [];

    peliculas.forEach(pelicula => {
        if (pelicula.categoria === peliculaSeleccionada.categoria) {
            peliculasRecomendadas.push(pelicula);
        }
    });
    return peliculasRecomendadas;
}

const pelisRecomendadas = peliculasRecomendadas();

// OBTENGO EL ID DEL CONTENEDOR DE TODOS LOS CARRUSELES
const carruselRecomendado = document.getElementById("categoria");
let carrusel = '';

// COMIENZO DE PAGINACION
if (pelisRecomendadas.length > 0) {
    const carruselInicio = '<div id="' + pelisRecomendadas[0].categoria + '" class="carousel slide" data-bs-touch="true">';
    const contenedorItemsCarruselInicio = ' <div class="carousel-inner"> ';
    let conjuntoCarruselItem = "";

    for (let x = 0; x < pelisRecomendadas.length; x++) {
        // COMIENZO DE CADA ITEM DEL CARRUSEL
        if (pelisRecomendadas.length - x < 6) break;
        const carruselItemInicio = (x === 0) ? '<div class="carousel-item active"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">'
            : '<div class="carousel-item"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">';

        let conjuntoCard = "";
        for (let y = 0; y < 6; y++) {
            // COMIENZO DE LA CARD
            const cardInicio = '<div class="col"><a href="' + pelisRecomendadas[x].url + '" target="_blank">  <div class="card h-100">'
            // URL DE LA PELICULA
            const cardUrlEImagen = '<img class="" src="' + pelisRecomendadas[x].imagen + '" class="card-img-top" alt="Imagen de la pelicula ' + pelisRecomendadas[x].nombre + '">'
            // CIERRE DE CARD
            const cardFin = ' </div> </a> </div>'
            const card = cardInicio + cardUrlEImagen + cardFin
            conjuntoCard = conjuntoCard + card;
            x++;
        }
        x--;
        // FIN DE CADA ITEM DEL CARRUSEL
        const carruselItemFin = '</div> </div>';
        const carruselItem = carruselItemInicio + conjuntoCard + carruselItemFin;
        conjuntoCarruselItem = conjuntoCarruselItem + carruselItem;
    }

    const contenedorCarruselesFin = '</div>'
    // ETIQUETAS PARA CIERRE DEL CARRUSEL
    const carruselFin = '<button class="carousel-control-prev carouselControl" type="button" data-bs-target="#' + pelisRecomendadas[0].categoria + '" data-bs-slide="prev"> <i class="fas fa-arrow-left fa-lg" style="color: #BE3144;"></i> <span class="visually-hidden">Previous</span> </button> <button class="carousel-control-next carouselControl" type="button" data-bs-target="#' + pelisRecomendadas[0].categoria + '" data-bs-slide="next"> <i class="fas fa-arrow-right fa-lg" style="color: #BE3144;"></i> <span class="visually-hidden">Next</span> </button> </div>';
    carrusel = carrusel + carruselInicio + contenedorItemsCarruselInicio + conjuntoCarruselItem + contenedorCarruselesFin + carruselFin;
}

carruselRecomendado.innerHTML = carrusel;

