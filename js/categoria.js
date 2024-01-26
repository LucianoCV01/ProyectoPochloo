const categorias = document.getElementsByClassName("dropdown-item")

Array.from(categorias).forEach(function(element)
{
    element.addEventListener("click", function()
    {
        const seleccionado = element.textContent
        let arreglo = [seleccionado, "categoria"]
        localStorage.setItem("Buscar", JSON.stringify(arreglo))
        window.location.href = "../html/categoria.html"
    })
    
})



