class Producto {
    constructor(codigo, nombre, categoria, descripcion, publicado, destacado, imagen, url) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this._publicado = publicado;
        this._destacado = destacado;
        this.imagen = imagen;
        this.url = url;
    }

    set publicado(valor) {
        this._publicado = valor;
    }
    set destacado(valor) {
        this._destacado = valor;
    }
}

let pelicula1 = new Producto(1234, "Pelicula", "Categoria", "Descripcion", false, false, "Link", "Link");

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

// const botonAgregar = document.getElementById("botonAgregar");
// botonAgregar.addEventListener("click", (event) => {
//     event.preventDefault();
//     const nombre = document.getElementById("nombre");
//     const categoria = document.getElementById("categoria");
//     const descripcion = document.getElementById("descripcion");
//     const publicado = document.getElementById("publicado");
//     const destacado = document.getElementById("destacado");
//     const imagen = document.getElementById("imagen");
//     const url = document.getElementById("url");

//     let producto = new Producto(123, nombre, categoria, descripcion, publicado, destacado, imagen, url); // Generar codigo aleatorio
//     const productos = []; // Obtengo productos del localstorage 
//     if (productos.find(element => element.nombre === producto.nombre))
//         console.log("Este producto ya se encuentra"); // Mandar mensaje de alerta al modal
//     else {
//         productos.push(producto);
//         guardarProductoLocalStorage(); // guardar en el localstorage el nuevo arreglo
//     }
// })