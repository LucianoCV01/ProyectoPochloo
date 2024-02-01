
const traerJson = () =>{
    let usuarioJson = fetch(`../json/usuario.json`)
    .then((resp=>{
    resp.json().then((data=>{
    localStorage.setItem("Usuario", JSON.stringify(data))
    }))
    }))
    .catch(console.warn)
}

traerJson()
