let formBuscador = document.getElementById("formBuscador")
let buscador = document.getElementById("buscador")
let btnBuscar = document.getElementById("btnBuscar")


btnBuscar.addEventListener("click", function(event)
{
    event.preventDefault
    const busqueda = buscador.value

    if(!busqueda == "")
    {
       formBuscador.innerHTML = ""
       let arreglo = [busqueda, "buscador"]
       localStorage.setItem("Buscar", JSON.stringify(arreglo))
       window.location.href = "../html/busqueda.html"
    }
    
})

