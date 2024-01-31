// let categoriasRandom = ["comedia","drama","accion","terror","fantasia","marvel","DC","infantiles","animadas","XXX"]
// let peliculas = [];
// for (i=0;i<200;i++){
//     let peli = {
//         codigo: "1",
//         nombre: "titanic",
//         categoria: categoriasRandom[Math.floor(Math.random() * categoriasRandom.length)],
//         descripcion: "La trama, una epopeya4 romántica, relata la relación de Jack Dawson y Rose DeWitt Bukater, dos jóvenes que se conocen y se enamoran a bordo del transatlántico RMS Titanic en su viaje inaugural desde Southampton, Inglaterra a Nueva York, EE. UU., en abril de 1912.",
//         publicado: 2004,
//         destacado: true,
//         imagen: "https://occ-0-1700-1740.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABay7tzf1DMf85mYtq9HWeuiiJSYQi7puC_74WRZGfsGalkvFFIShIeD9Y9BeSJGXbG-7qjJSkoZ1VqW4HH232RyUDYiUJkP77vU.webp?r=10e",
//         url: 'https://www.netflix.com/search?q=titani&jbv=60027711'
//     }
//     peliculas.push(peli);
//     console.log();
// }
// localStorage.setItem("peliculas", JSON.stringify(peliculas));
let peliculas = JSON.parse(localStorage.getItem("Pelicula"));
const arrayDeArraysPorCategoria = peliculas.reduce((acumulador, pelicula) => {
  const categoriaExistente = acumulador.find(arr => arr[0].categoria === pelicula.categoria);

  if (categoriaExistente) {
    categoriaExistente.push(pelicula);
  } else {
    acumulador.push([pelicula]);
  }

  return acumulador;
}, []);

//OBTENGO EL ID DEL CONTENEDOR DE TODOS LOS CARRUSELES
const carruselesPorCategoria = document.getElementById("categoria");
let carruseles = '';
//RECORRO EL ARRAY DE ARRAYS DIVIDIDO POR CATEGORIAS
if (arrayDeArraysPorCategoria != null){
arrayDeArraysPorCategoria.forEach(arrayCategoria => {
    if (arrayCategoria.length < 6) return
    //NOMBRE DE LA CATEGORIA
    const nombreCategoria = '<h1 class="tituloCategoria display-5 mt-4 mb-0 fw-bolder ps-3">'+arrayCategoria[0].categoria+'</h1>'
    //COMIENZO DE PAGINACION
    const carruselInicio = '<!-- COMIENZO DE PAGINACION --> <div id="'+arrayCategoria[0].categoria+'" class="carousel slide" data-bs-touch="true">';
    const contenedorItemsCarruselInicio = ' <div class="carousel-inner"> ';
    let conjuntoCarruselItem = "";
    let carruselPorCategoria = "";
    for(x=0; x<arrayCategoria.length; x++){
        //COMIENZO DE CADA ITEM DEL CARRUSEL
        if (arrayCategoria.length - x < 6) break;
        let index = x
        let carruselItemInicio = ''
        let conjuntoCard = "";
        let carruselItem = "";
        if (x === 0){
           carruselItemInicio = '<div class="carousel-item active"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">'
        }
        else{ 
           carruselItemInicio = '<div class="carousel-item"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">'
        }
          for(y=0; y<6 ; y++){
              //COMIENZO DE LA CARD
              const cardInicio = '<div class="col"><a href="'+arrayCategoria[x].url+'" target="_blank">  <div class="card h-100">'
              //URL DE LA PELICULA
              const cardUrlEImagen= '<img class="" src="'+arrayCategoria[x].imagen+'" class="card-img-top" alt="Imagen de la pelicula '+arrayCategoria[x].nombre+'">'
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
              const cardFin= ' </div> </a> </div>'
              const card = cardInicio + cardUrlEImagen + cardFin
              conjuntoCard = conjuntoCard + card;
              x ++;
        }
        x--
        //FIN DE CADA ITEM DEL CARRUSEL
        const carruselItemFin = '</div> </div>'
        carruselItem = carruselItemInicio + conjuntoCard + carruselItemFin;
        conjuntoCarruselItem = conjuntoCarruselItem + carruselItem;
    }
    const contenedorCarruselesFin = '</div>'
    //ETIQUETAS PARA CIERRE DEL CARRUSEL
    const carruselFin = '<button class="carousel-control-prev carouselControl" type="button" data-bs-target="#'+arrayCategoria[0].categoria+'" data-bs-slide="prev"> <i class="fas fa-arrow-left fa-lg" style="color: #BE3144;"></i> <span class="visually-hidden">Previous</span> </button> <button class="carousel-control-next carouselControl" type="button" data-bs-target="#'+arrayCategoria[0].categoria+'" data-bs-slide="next"> <i class="fas fa-arrow-right fa-lg" style="color: #BE3144;"></i> <span class="visually-hidden">Next</span> </button> </div>'
    carruselPorCategoria = nombreCategoria + carruselInicio + contenedorItemsCarruselInicio + conjuntoCarruselItem + contenedorCarruselesFin + carruselFin
    carruseles = carruseles + carruselPorCategoria;
})};
carruselesPorCategoria.innerHTML = carruseles;

const obtenerPeliculaDestacada = () => {
  return peliculas.find(pelicula => pelicula.destacado == true)
}

//PELICULA DESTACADA
const peliculaDestacada = document.getElementById("peliculaDestacada")
const nombrePeliculaDestacada = document.getElementById("nombrePeliculaDestacada")
const descripcionPeliculaDestacada = document.getElementById("descripcionPeliculaDestacada")
const reproducirPeliculaDestacada = document.getElementById("reproducirPeliculaDestacada")

peliculaDestacada.style = `background-image: linear-gradient(
                                              to right,
                                              rgba(0, 0, 0, 1),
                                              rgba(0, 0, 0, 0.4),
                                              rgba(0, 0, 0, 0.25),
                                              rgba(0, 0, 0, 0)
                                            ),  
                                            url(${obtenerPeliculaDestacada().imagen});`
nombrePeliculaDestacada.textContent =  obtenerPeliculaDestacada().nombre.toUpperCase();
descripcionPeliculaDestacada.textContent = obtenerPeliculaDestacada().descripcion
reproducirPeliculaDestacada.addEventListener("click",(event)=>{
  event.preventDefault();
  window.open(obtenerPeliculaDestacada().url).focus
})
