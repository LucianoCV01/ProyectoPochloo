let usuario = []

const traerJson = () =>{
    let usuarioJson = fetch("../json/fakeApiEnzo.json")
    .then((resp=>{
    resp.json().then((data=>{
    localStorage.setItem("Usuario", JSON.stringify(data))
    }))
    }))
    .catch(console.warn)
}

traerJson()
usuario = JSON.parse(localStorage.getItem("Usuario"))

export default usuario

