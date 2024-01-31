let peliculas = JSON.parse(localStorage.getItem("Pelicula"));
const categoriaSeleccionada = obtenerPelicula(idPelicula).categoria;

// Filtrar las películas por la categoría seleccionada
const peliculasCategoria = peliculas.filter(pelicula => pelicula.categoria === categoriaSeleccionada);

// Verificar si hay al menos 6 películas en la categoría seleccionada
if (peliculasCategoria.length >= 6) {
    // Crear el carrusel para la categoría seleccionada
    const carruselPorCategoria = document.getElementById("categoria");

    // Nombre de la categoría
    const nombreCategoria = `<h1 class="tituloCategoria display-5 mt-4 mb-0 fw-bolder ps-3">${categoriaSeleccionada}</h1>`;

    // Comienzo del carrusel
    const carruselInicio = `<div id="${categoriaSeleccionada}" class="carousel slide" data-bs-touch="true">
                            <div class="carousel-inner">`;

    // Conjunto de elementos del carrusel
    let conjuntoCarruselItem = "";
    for (let x = 0; x < peliculasCategoria.length; x++) {
        const pelicula = peliculasCategoria[x];
        // Comienzo de cada item del carrusel
        const carruselItemInicio = `<div class="carousel-item ${x === 0 ? 'active' : ''}">
                                    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">`;

        // Crear la tarjeta (card) para cada película
        const card = `<div class="col">
                        <a href="${pelicula.url}" target="_blank">
                            <div class="card h-100">
                                <img src="${pelicula.imagen}" class="card-img-top" alt="Imagen de la película ${pelicula.nombre}">
                                <div class="card-body">
                                    <h5 class="card-title">${pelicula.nombre}</h5>
                                    <p class="card-text">${pelicula.descripcion}</p>
                                </div>
                            </div>
                        </a>
                    </div>`;

        // Fin de cada item del carrusel
        const carruselItemFin = `</div></div>`;
        conjuntoCarruselItem += carruselItemInicio + card + carruselItemFin;

        // Si ya se han mostrado 6 elementos, salir del bucle
        if (x + 1 === 6) break;
    }

    // Fin del carrusel
    const carruselFin = `</div>
                        <button class="carousel-control-prev carouselControl" type="button" data-bs-target="#${categoriaSeleccionada}" data-bs-slide="prev">
                            <i class="fas fa-arrow-left fa-lg" style="color: #BE3144;"></i>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next carouselControl" type="button" data-bs-target="#${categoriaSeleccionada}" data-bs-slide="next">
                            <i class="fas fa-arrow-right fa-lg" style="color: #BE3144;"></i>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>`;

    // Crear el carrusel completo
    const carruselCompleto = nombreCategoria + carruselInicio + conjuntoCarruselItem + carruselFin;

    // Insertar el carrusel en el contenedor
    carruselPorCategoria.innerHTML = carruselCompleto;
}
