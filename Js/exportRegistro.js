const traerJson = () =>
{
    let jsonRegistro = fetch('../json/fakeApiRegistro.json')
    .then((resp=>{
    resp.json().then((data=>{
    localStorage.setItem("Registro", JSON.stringify(data))
    }))
    }))
    .catch(console.warn)
} 

traerJson()