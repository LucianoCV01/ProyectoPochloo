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
