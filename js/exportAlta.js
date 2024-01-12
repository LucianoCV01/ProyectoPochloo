let registro = []

let registroJson = fetch(`../js/registro.json`)
.then((resp=>{
    resp.json().then((data=>{
    localStorage.setItem("Registro", JSON.stringify(data))
    }))
}))
.catch(console.warn)

registro = JSON.parse(localStorage.getItem("Registro"))

export default registro