class Producto {
    constructor(codigo, nombre, categoria, descripcion, publicado, destacado, imagen, url) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.publicado = publicado;
        this.destacado = destacado;
        this.imagen = imagen;
        this.url = url;
    }
}

//let pelicula1 = new Producto(1234, "Pelicula", "Categoria", "Descripcion", false, false, "Link", "Link");

// FUNCIONES LOCALSTORAGE
const leerLocalStorage = (nombreLocalStorage) => {
    let arregloObjetos = JSON.parse(localStorage.getItem(nombreLocalStorage));
    if (arregloObjetos === null) {
        arregloObjetos = [];
    }
    return arregloObjetos;
}

const guardarLocalStorage = (nombreLocalStorage, arregloObjetos) => {
    localStorage.setItem(nombreLocalStorage, JSON.stringify(arregloObjetos));
}

// const eliminarLocalStorage = () => {}
// const limpiarLocalStorage = () => {localStorage.clear();}

// FUNCIONES ADMINISTRACION PRODUCTOS
const crearProducto = () => {
    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;
    const publicado = document.getElementById("publicado").checked;
    const destacado = document.getElementById("destacado").checked;
    const imagen = document.getElementById("imagen").value;
    const url = document.getElementById("url").value;

    let producto = new Producto(1234, nombre, categoria, descripcion, publicado, destacado, imagen, url); // Generar codigo aleatorio por libreria o manual?
    return producto;
}

// FUNCIONES BOTONES ADMINISTRACION PRODUCTOS 
const botonAgregar = document.getElementById("botonAgregar");
botonAgregar.addEventListener("click", (event) => {
    event.preventDefault();
    const producto = crearProducto();
    const productos = leerLocalStorage("Pelicula");
    if (productos.find(element => element.codigo === producto.codigo))
        console.log("Este producto ya se encuentra"); // Mandar mensaje de alerta al modal
    else {
        productos.push(producto);
        guardarLocalStorage("Pelicula", productos);
    }
})