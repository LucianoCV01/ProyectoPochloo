let categoriasRandom = ["comedia","drama","accion","terror","fantasia"]
let peliculas = [];
for (i=0;i<80;i++){
    let peli = {
        codigo: "1",
        nombre: "titanic",
        categoria: categoriasRandom[Math.floor(Math.random() * categoriasRandom.length)],
        descripcion: "La trama, una epopeya4 romántica, relata la relación de Jack Dawson y Rose DeWitt Bukater, dos jóvenes que se conocen y se enamoran a bordo del transatlántico RMS Titanic en su viaje inaugural desde Southampton, Inglaterra a Nueva York, EE. UU., en abril de 1912.",
        publicado: 2004,
        destacado: true,
        imagen: "https://svg-files.pixelied.com/10755d84-04b2-42d3-b0b8-8a35d625d627/thumb-256px.png",
        url: 'https://www.netflix.com/search?q=titani&jbv=60027711'
    }
    peliculas.push(peli);
    console.log();
}
localStorage.setItem("peliculas", JSON.stringify(peliculas));

const arrayDeArraysPorCategoria = peliculas.reduce((acumulador, pelicula) => {
  const categoriaExistente = acumulador.find(arr => arr[0].categoria === pelicula.categoria);

  if (categoriaExistente) {
    categoriaExistente.push(pelicula);
  } else {
    acumulador.push([pelicula]);
  }

  return acumulador;
}, []);

console.log(arrayDeArraysPorCategoria);




// //OBTENGO EL ID DEL CONTENEDOR DE TODOS LOS CARRUSELES
// let carruselesPorCategoria = document.getElementById("categoria");
// //RECORRO EL ARRAY DE ARRAYS DIVIDIDO POR CATEGORIAS
// arrayDeArraysPorCategoria.forEach(arrayCategoria => {
//   console.log(arrayCategoria[0].categoria);
//     //NOMBRE DE LA CATEGORIA
//     carruselesPorCategoria.innerHTML += '<h1 class="display-5 my-3 fw-bolder">'+arrayCategoria[0].categoria+'</h1>'
//     //COMIENZO DE PAGINACION
//     carruselesPorCategoria.innerHTML += '<!-- COMIENZO DE PAGINACION --> <div id="'+arrayCategoria[0].categoria+'" class="carousel slide" data-bs-touch="true"> <div class="carousel-inner"> ';
//     console.log(arrayCategoria.length);
//     for(x=0; x<1; x++){
//         //COMIENZO DE CADA ITEM DEL CARRUSEL
//         carruselesPorCategoria.innerHTML += '<div class="carousel-item"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">'
//         for(y=x; (y<6 || y<arrayCategoria.length) ; y++){
//             //COMIENZO DE LA CARD
//             carruselesPorCategoria.innerHTML += '<div class="position-relative card2">'
//             //URL DE LA PELICULA
//             carruselesPorCategoria.innerHTML += '<a href="'+arrayCategoria[y].url+'">'
//             console.log(arrayCategoria[y].url);
//             console.log(arrayCategoria[y].imagen);
//             console.log(arrayCategoria[y].nombre);
//             //ETIQUETAS NECESARIAS
//             carruselesPorCategoria.innerHTML += '<div class="col"> <div class="card h-100">'
//             //IMAGEN DE LA PELICULAS
//             carruselesPorCategoria.innerHTML += '<img class="m-3" src="'+arrayCategoria[y].imagen+'" class="card-img-top" alt="Imagen de la pelicula'+arrayCategoria[y].nombre+'">'
//             //CUERPO DE LA CARTA
//             carruselesPorCategoria.innerHTML += '<div class="card-body">'
//             //BOTONES DEL CUERPO (HOVER)
//             carruselesPorCategoria.innerHTML += '<h5 class="card-title text-truncate"></h5>'
//             //TEXTO DEL CUERPO
//             carruselesPorCategoria.innerHTML += '<p class="card-text text-truncate"></p>'
//             //CIERRE DE CARD
//             carruselesPorCategoria.innerHTML += '</div> </div> </div> </a> </div>'
//         }
//         //FIN DE CADA ITEM DEL CARRUSEL
//         carruselesPorCategoria.innerHTML += '</div> </div>'
//         x += 5;
//     }
//     //ETIQUETAS PARA CIERRE DEL CARRUSEL
//     carruselesPorCategoria.innerHTML += '</div> <button class="carousel-control-prev carouselControl" type="button" data-bs-target="'+arrayCategoria[0].categoria+'" data-bs-slide="prev"> <i class="fas fa-arrow-left fa-lg" style="color: #ff69b4;"></i> <span class="visually-hidden">Previous</span> </button> <button class="carousel-control-next carouselControl" type="button" data-bs-target="'+arrayCategoria[0].categoria+'" data-bs-slide="next"> <i class="fas fa-arrow-right fa-lg" style="color: #ff69b4;"></i> <span class="visually-hidden">Next</span> </button> </div>'
//     console.log(arrayCategoria[0].categoria);
// });


//OBTENGO EL ID DEL CONTENEDOR DE TODOS LOS CARRUSELES
const carruselesPorCategoria = document.getElementById("categoria");
let carruseles = '';
//RECORRO EL ARRAY DE ARRAYS DIVIDIDO POR CATEGORIAS
arrayDeArraysPorCategoria.forEach(arrayCategoria => {
  console.log(arrayCategoria[0].categoria);
    //NOMBRE DE LA CATEGORIA
    const nombreCategoria = '<h1 class="display-5 my-3 fw-bolder">'+arrayCategoria[0].categoria+'</h1>'
    //COMIENZO DE PAGINACION
    const carruselInicio = '<!-- COMIENZO DE PAGINACION --> <div id="'+arrayCategoria[0].categoria+'" class="carousel slide" data-bs-touch="true">';
    const contenedorItemsCarruselInicio = ' <div class="carousel-inner"> ';
    let conjuntoCarruselItem = "";
    let carruselPorCategoria = "";
    for(x=0; x<arrayCategoria.length; x++){
        //COMIENZO DE CADA ITEM DEL CARRUSEL
        let index = x
        if (arrayCategoria.length - index < 6) break;
        let carruselItemInicio = ''
        let conjuntoCard = "";
        let carruselItem = "";
        if (x === 0){
           carruselItemInicio = '<div class="carousel-item active"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">'
        }
        else{ 
           carruselItemInicio = '<div class="carousel-item"> <div class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">'
        }
        //let index = x
        if (arrayCategoria.length - index >= 6){
          for(y=0; y<6 ; y++){
              //COMIENZO DE LA CARD
              const cardInicio = '<div class="col"><a href="'+arrayCategoria[index].url+'">  <div class="card h-100">'
              //URL DE LA PELICULA
              const cardUrlEImagen= '<img class="m-3" src="'+arrayCategoria[index].imagen+'" class="card-img-top" alt="Imagen de la pelicula'+arrayCategoria[index].nombre+'">'
              //ETIQUETAS NECESARIAS
              // carruselesPorCategoria.innerHTML += '<div class="col"> <div class="card h-100">'
              // //IMAGEN DE LA PELICULAS
              // carruselesPorCategoria.innerHTML += '<img class="m-3" src="'+arrayCategoria[y].imagen+'" class="card-img-top" alt="Imagen de la pelicula'+arrayCategoria[y].nombre+'">'
              //CUERPO DE LA CARTA
              const cardCuerpo = '<div class="card-body">'
              //BOTONES DEL CUERPO (HOVER)
              const cardCuerpoTitulo = '<h5 class="card-title text-truncate"></h5>'
              //TEXTO DEL CUERPO
              const cardCuerpoTexto = '<p class="card-text text-truncate"></p>'
              //CIERRE DE CARD
              const cardFin= '</div> </div> </a> </div>'
              const card = cardInicio + cardUrlEImagen + cardCuerpo + cardCuerpoTitulo+ cardCuerpoTexto+ cardFin
              conjuntoCard = conjuntoCard + card;
              index ++;
              console.log(index);
          }
        }
        x += 5
        //FIN DE CADA ITEM DEL CARRUSEL
        console.log("SALTO");
        const carruselItemFin = '</div> </div>'
        carruselItem = carruselItemInicio + conjuntoCard + carruselItemFin;
        conjuntoCarruselItem = conjuntoCarruselItem + carruselItem;
        
    }
    const contenedorCarruselesFin = '</div>'
    //ETIQUETAS PARA CIERRE DEL CARRUSEL
    const carruselFin = '<button class="carousel-control-prev carouselControl" type="button" data-bs-target="#'+arrayCategoria[0].categoria+'" data-bs-slide="prev"> <i class="fas fa-arrow-left fa-lg" style="color: #ff69b4;"></i> <span class="visually-hidden">Previous</span> </button> <button class="carousel-control-next carouselControl" type="button" data-bs-target="#'+arrayCategoria[0].categoria+'" data-bs-slide="next"> <i class="fas fa-arrow-right fa-lg" style="color: #ff69b4;"></i> <span class="visually-hidden">Next</span> </button> </div>'
    carruselPorCategoria = nombreCategoria + carruselInicio + contenedorItemsCarruselInicio + conjuntoCarruselItem + contenedorCarruselesFin + carruselFin
    carruseles = carruseles + carruselPorCategoria;
});
carruselesPorCategoria.innerHTML = carruseles;