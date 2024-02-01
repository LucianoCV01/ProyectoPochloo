let registrojson = []

const traerJson = () =>
{
    let jsonn = fetch(`../json/registro.json`)
    .then((resp=>{
    resp.json().then((data=>{
    localStorage.setItem("Registro", JSON.stringify(data))
    }))
    }))
    .catch(console.warn)
} 

traerJson()

let loquevenga = [ {
    "nombre":"Guillermo",
    "apellido":"Sanchez",
    "email":"guillermosancheztuc@gmail.com",
    "clave":"peekaboo",
    "tipo":"Comun",
    "estado":"Pendiente"
}]

registrojson = JSON.parse(localStorage.getItem("Registro"))
let registro = [...registrojson, ...loquevenga]
localStorage.setItem("Registro", JSON.stringify(registro))


export default registro