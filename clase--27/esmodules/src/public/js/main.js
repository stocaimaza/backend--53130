const formularioProductos = document.getElementById("formularioProductos");

formularioProductos.addEventListener("submit", async (e) => {
    e.preventDefault();

    //Me guardo los datos del formulario: 
    //Nombre: 
    //Categoria: 
    //Precio: 

    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;

    const data = {
        nombre,
        categoria,
        precio
    }

    const response = await fetch("/juguetes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        console.log("Tenemos un error, tendras una mala noticia este fin de semana");
    }

    //Limpiamos el formulario: 
    formularioProductos.reset();
})