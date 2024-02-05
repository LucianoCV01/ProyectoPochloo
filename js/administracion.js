//FUNCIÓN PARA COMPROBAR QUE LA PERSONA QUE ACCEDA A LA PÁGINA SEA ADMINISTRADOR
const comprobarAdmin = () =>
{
    let persona = JSON.parse(localStorage.getItem("Logueado"))
    if(!(persona.tipo == "Administrador"))
    {
        Swal.fire({
            title: "Acceso denegado",
            text: "Solo administradores pueden acceder a la página",
            icon: "error",
        })
        setTimeout(() => {
            window.location.href = 'inicio.html';
        }, 100);
    }
}

comprobarAdmin()

class Producto {
    constructor(codigo, nombre, categoria, descripcion, publicado, destacado, imagenDestacado, logo, imagen, url) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.publicado = publicado;
        this.destacado = destacado || false;
        this.imagenDestacado = imagenDestacado || null;
        this.logo = logo || null;
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

function existeLocalStorage(clave) {
    return localStorage.getItem(clave) !== null;
}
    const cargarLocalStorage = () => {
        if(!existeLocalStorage("Pelicula")){
        let peliculasJson = fetch(`../json/peliculas.json`)
            .then((resp => {
                resp.json().then((data => {
                    guardarLocalStorage("Pelicula", data);
                }))
            }))
            .catch(console.warn)
    }
}

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
    // Trunca la descripción si excede el límite de caracteres
    const descripcionTruncada = producto.descripcion.length > 120 ? producto.descripcion.substring(0, 120) + "..." : producto.descripcion;
    return `
        <tr>
            <td class="p-1">${producto.codigo}</td>
            <td class="p-2">${producto.nombre}</td>
            <td class="p-1">${producto.categoria}</td>
            <td class="p-2 pt-3 pb-3 limit-description">${descripcionTruncada}</td>
            <td class="p-1">
                <div>
                    <button type="button" class="btn btn-secondary" onclick="publicarPelicula(${producto.codigo})">
                        <i class="${producto.publicado ? 'fa-solid fa-check-square' : 'fa-regular fa-square'}"></i>
                    </button>
                </div>
            </td>
            
            <td class="p-1">
                <div>
                    <button type="button" class="btn btn-warning" onclick="destacarProducto(${producto.codigo})"><i class="${producto.destacado ? 'fa-solid fa-star' : 'fa-regular fa-star'}"></i></button>
                </div>
            </td>
            <td class="p-1">
                <div>
                    <button type="button" class="btn btn-success" data-bs-target="#miModal"
                    onclick="mostrarModal('Modificar Producto', buscarProductoPorCodigo(${producto.codigo}))"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
            </td>
            <td class="p-1">
                <div>
                    <button type="button" class="btn btn-danger" onclick="confirmarEliminar('${producto.nombre}',${indice})"><i class="fa-solid fa-trash"></i></button>
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
    const imagenDestacado = document.getElementById("imagenDestacado").value; // nuevo campo
    const logo = document.getElementById("logo").value; // nuevo campo
    const imagen = document.getElementById("imagen").value;
    const url = document.getElementById("url").value;

    let producto = new Producto(generarCodigo(), nombre, categoria, descripcion, publicado, destacado, imagenDestacado, logo, imagen, url);
    return producto;
}
const destacarProducto = (codigoProducto) => {
    let productos = leerLocalStorage("Pelicula");
    productos.forEach(producto => {
        if (codigoProducto === producto.codigo) {
            producto.destacado = true;
        } else {
            producto.destacado = false;
        }
    });
    guardarLocalStorage("Pelicula", productos);
    mostrarPeliculasEnTabla();
}
const eliminarPelicula = (posicion) => {
    let arregloPeliculas = leerLocalStorage("Pelicula");
    arregloPeliculas.splice(posicion, 1)
    guardarLocalStorage("Pelicula", arregloPeliculas);
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
    mostrarPeliculasEnTabla();
}

const confirmarEliminar = (nombre, indice) => {
    Swal.fire({
        title: "¿Eliminar la película " + nombre + "?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Eliminado!",
                text: "La acción se completó exitosamente",
                icon: "success",
                showCancelButton: false
            });
            eliminarPelicula(indice);
        }
    });
}

cargarLocalStorage();
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
        document.getElementById('imagenDestacado').value = datosProducto.imagenDestacado || ""; // nuevo campo
        document.getElementById('logo').value = datosProducto.logo || ""; // nuevo campo
        document.getElementById('imagen').value = datosProducto.imagen;
        document.getElementById('url').value = datosProducto.url;
        modalBtnAccion.textContent = "Actualizar";
        document.getElementById('publicado').parentElement.style.display = 'none';
        document.getElementById('destacado').parentElement.style.display = 'none';
    } else {
        // Limpiar el formulario si no hay datos existentes
        document.getElementById('formularioProductos').reset()
        document.getElementById('publicado').parentElement.style.display = 'block';
        document.getElementById('destacado').parentElement.style.display = 'none';
        modalBtnAccion.textContent = "Agregar";
    }
    modal.show();
}
modalBtnAccion.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.getElementById('formularioProductos');
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
        return;
    }

    let productos = leerLocalStorage("Pelicula");
    let producto = crearProducto();
    if (modalBtnAccion.textContent === "Agregar") {
        if (buscarProductoPorCodigo(producto.codigo) !== null)
            alert("Este producto ya se encuentra");
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
    mostrarPeliculasEnTabla();
})

// Agregar un event listener para el evento 'input' en cada campo del formulario
const camposFormulario = document.querySelectorAll('#formularioProductos input, #formularioProductos textarea');
camposFormulario.forEach((campo) => {
    campo.addEventListener('input', () => {
        // Al realizar una corrección, quitar las clases de Bootstrap para campos inválidos
        campo.classList.remove('is-invalid');
        campo.nextElementSibling.textContent = ''; // Limpiar mensajes de error
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Default: Show Peliculas section
    showPeliculas();

    // Button click events
    document.getElementById("btnPeliculas").addEventListener("click", function() {
        showPeliculas();
        cambiarTitulo("Administrar Películas");
    });
    
    document.getElementById("btnUsuarios").addEventListener("click", function() {
        showUsuarios();
        cambiarTitulo("Administrar Usuarios");
    });

    function showPeliculas() {
        document.getElementById("adminPeliculas").classList.remove("hidden");
        document.getElementById("adminUsuarios").classList.add("hidden");
        document.getElementById("btnPeliculas").classList.add("active");
        document.getElementById("btnUsuarios").classList.remove("active");
    }

    function showUsuarios() {
        document.getElementById("adminPeliculas").classList.add("hidden");
        document.getElementById("adminUsuarios").classList.remove("hidden");
        document.getElementById("btnPeliculas").classList.remove("active");
        document.getElementById("btnUsuarios").classList.add("active");
    }

    function cambiarTitulo(titulo) {
        document.getElementById("contenedorTituloBotones").querySelector("h1").textContent = titulo;
    }
});

