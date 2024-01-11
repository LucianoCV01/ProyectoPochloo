let arregloPeliculas = []

let peliculasJson = fetch(`../json/simulacion.json`)
.then((resp=>{
    resp.json().then((data=>{
    localStorage.setItem("Pelicula", JSON.stringify(data))
    }))
}))
.catch(console.warn)

arregloPeliculas = JSON.parse(localStorage.getItem("Pelicula"))

export default arregloPeliculas