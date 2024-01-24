let formBuscador = document.getElementById("formBuscador")
let buscador = document.getElementById("buscador")
let btnBuscar = document.getElementById("btnBuscar")


btnBuscar.addEventListener("click", function(event)
{
    event.preventDefault
    
    let busqueda = buscador.value
    if(!busqueda == "")
    {
       formBuscador.innerHTML = ""
       localStorage.setItem("Busqueda", busqueda)
       window.location.href = "../html/busqueda.html"
    }
    
})

