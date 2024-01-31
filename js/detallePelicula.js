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

    detallePeli.innerHTML += `<div class="card text-bg-dark">
    <img id="imgDetalle" class = "opacity-50" src="${pelicula.imagen}" alt="Imagen de la película ${pelicula.nombre}">
    <div class="card-img-overlay p-5 d-flex flex-column justify-content-center align-items-start">
    <h2 class="card-title">${pelicula.nombre}</h2>
    <p class="card-text"><small>${pelicula.categoria}</small></p>
    <p class="card-text 12 col-md-8 col-lg-6">${pelicula.descripcion}</p>
    <a href="${pelicula.url}" target="_blank" rel="noopener noreferrer">
        <button class="btn btn-primary"><i class="fa-solid fa-play"></i> Reproducir</button>
    </a>
</div>

</div>`;
};

mostrarPelicula();
