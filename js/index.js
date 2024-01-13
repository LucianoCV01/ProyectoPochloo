class Producto {
    constructor(codigo, nombre, categoria, descripcion, publicado, destacado, imagen, url) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.publicado = publicado;
        this.destacado =  destacado || false;
        this.imagen = imagen;
        this.url = url;
    }
}

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

// FUNCIONES EXTRA
const generarCodigo = () => {
    const productos = leerLocalStorage("Pelicula");
    let ultimoCodigo = 0;
    if (productos.length > 0) {
        ultimoCodigo = productos[productos.length - 1].codigo;
    }
    return (ultimoCodigo + 1);
}
const buscarProductoPorCodigo = (codigoBuscado) => {
    const productos = leerLocalStorage("Pelicula");
    const productoEncontrado = productos.find(producto => producto.codigo === codigoBuscado);

    if (productoEncontrado) {
        return productoEncontrado;
    }
    return null;
}
const construirFilaTabla = (producto, indice) => {
    return `
        <tr>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${producto.descripcion}</td>
            <td><input type="checkbox" ${producto.publicado ? 'checked' : ''} onchange="publicarPelicula(${producto.codigo})"></td>
            <td>
                <div>
                    <button type="button" class="btn btn-warning" onclick="destacarProducto(${producto.codigo})"><i class="${producto.destacado ? 'fa-solid fa-star' : 'fa-regular fa-star'}"></i></button>
                </div>
            </td>
            <td>
                <div>
                    <button type="button" class="btn btn-success" data-bs-target="#miModal"
                    onclick="mostrarModal('Modificar Producto', buscarProductoPorCodigo(${producto.codigo}))"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
            </td>
            <td>
                <div>
                    <button type="button" class="btn btn-danger" onclick="eliminarPelicula(${indice})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `;
};
const mostrarPeliculasEnTabla = () => {
    tbody.innerHTML = "";
    const productos = leerLocalStorage("Pelicula");
    for (let i = 0; i < productos.length; i++) {
        const filaHTML = construirFilaTabla(productos[i], i);
        tbody.innerHTML += filaHTML;
    }
};
// FUNCIONES ADMINISTRACION PRODUCTOS
const crearProducto = () => {
    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;
    const publicado = document.getElementById("publicado").checked;
    const destacado = document.getElementById("destacado").checked;
    const imagen = document.getElementById("imagen").value;
    const url = document.getElementById("url").value;

    let producto = new Producto(generarCodigo(), nombre, categoria, descripcion, publicado, destacado, imagen, url);
    return producto;
}
const destacarProducto = (codigoProducto) => {
    let productos = leerLocalStorage("Pelicula");
    productos.forEach(producto => {
        if (codigoProducto === producto.codigo) {
            producto.destacado = true;
        } else{
            producto.destacado = false;
        }
    });
    guardarLocalStorage("Pelicula", productos);
    console.log(productos);
    mostrarPeliculasEnTabla();
}
const eliminarPelicula = (posicion) => {
    let arregloPeliculas = leerLocalStorage("Pelicula");
    arregloPeliculas.splice(posicion, 1)
    guardarLocalStorage("Pelicula", arregloPeliculas);
    console.log(productos);
    mostrarPeliculasEnTabla();
}
const publicarPelicula = (codigoProducto) => {
    let productos = leerLocalStorage("Pelicula");
    productos.forEach(producto => {
        if (codigoProducto === producto.codigo) {
            if (producto.publicado) {
                producto.publicado = false;
            } else {
                producto.publicado = true;
            }
        }
    });
    guardarLocalStorage("Pelicula", productos);
    console.log(productos);
    mostrarPeliculasEnTabla();
}

mostrarPeliculasEnTabla();
// MODAL
let modal
const mostrarModal = (titulo, datosProducto) => {
    modal = new bootstrap.Modal(document.getElementById('miModal'));
    const modalBtnAccion = document.getElementById('modalBtnAccion');
    document.getElementById('staticBackdropLabel').textContent = titulo;

    // Lógica para llenar el formulario con datos existentes, si los hay
    if (datosProducto) {
        document.getElementById('codigo').value = datosProducto.codigo;
        document.getElementById('nombre').value = datosProducto.nombre;
        document.getElementById('categoria').value = datosProducto.categoria;
        document.getElementById('descripcion').value = datosProducto.descripcion;
        document.getElementById('publicado').checked = datosProducto.publicado;
        document.getElementById('destacado').checked = datosProducto.destacado;
        document.getElementById('imagen').value = datosProducto.imagen;
        document.getElementById('url').value = datosProducto.url;
        modalBtnAccion.textContent = "Actualizar";
        document.getElementById('publicado').parentElement.style.display = 'none';
        document.getElementById('destacado').parentElement.style.display = 'none';
    } else {
        // Limpiar el formulario si no hay datos existentes
        document.getElementById('formularioProductos').reset()
        modalBtnAccion.textContent = "Agregar";
    }
    modal.show();
}
modalBtnAccion.addEventListener("click", (event) => {
    event.preventDefault();
    let productos = leerLocalStorage("Pelicula");
    let producto = crearProducto();
    if (modalBtnAccion.textContent === "Agregar") {
        if (buscarProductoPorCodigo(producto.codigo) !== null)
            console.log("Este producto ya se encuentra");
        else {
            if (producto.destacado) {
                destacarProducto(producto.codigo);
            }
            productos.push(producto);
        }
    } else {
        const codigoAModificar = document.getElementById("codigo").value;
        const index = productos.findIndex(prod => Number(prod.codigo) === Number(codigoAModificar));
        if (index !== -1) {
            producto.codigo = codigoAModificar;
            productos[index].nombre = producto.nombre;
            productos[index].categoria = producto.categoria;
            productos[index].descripcion = producto.descripcion;
            productos[index].publicado = producto.publicado;
            productos[index].destacado = producto.destacado;
            productos[index].imagen = producto.imagen;
            productos[index].url = producto.url;
        }
        else {
            console.log("Error al intentar modificar un producto");
        }
    }
    guardarLocalStorage("Pelicula", productos);
    modal.hide();
    console.log(productos);
    mostrarPeliculasEnTabla();
})