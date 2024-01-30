let pelisJson = fetch(`../json/peliculas.json`)
.then((resp=>{
    resp.json().then((data=>{
    localStorage.setItem("Pelicula", JSON.stringify(data))
    }))
}))
.catch(console.warn)






