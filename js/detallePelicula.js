// const idPelicula = localStorage.getItem('peliculaSeleccionada');
// console.log('ID de la película seleccionada:', idPelicula);
const idPelicula = 1;

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
    detallePeli.innerHTML += `<div class="background-image-container">
        <img src="${pelicula.imagen}" alt="Imagen de la película ${pelicula.nombre}">
    </div>
    <h1>${pelicula.nombre}</h1>
    <h5>${pelicula.categoria}</h5>
    <a href="${pelicula.url}" target="_blank" rel="noopener noreferrer">
    <button class="btn btn-primary">Reproducir</button>
    </a>
    <p>${pelicula.descripcion}</p>`

};

mostrarPelicula();