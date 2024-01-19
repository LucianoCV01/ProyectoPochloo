const categorias = document.getElementsByClassName("dropdown-item")

Array.from(categorias).forEach(function(element)
{
    element.addEventListener("click", function()
    {
        const seleccionado = element.textContent
        localStorage.setItem("Categoria", seleccionado)
        // window.location.href = "otra_pagina.html"
    })
    
})



