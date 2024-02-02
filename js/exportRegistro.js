function existeLocalStorage(clave) {
    return localStorage.getItem(clave) !== null;
}

if(!existeLocalStorage("Registro"))
{
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
}

