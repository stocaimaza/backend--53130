const formularioProductos = document.getElementById("formularioProductos"); 

formularioProductos.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    //Prevenir que el formulario se envie automaticamente

    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;
    
    const data = {
        nombre : nombre,
        categoria : categoria,
        precio : precio
    }; 

    try {
        await fetch("/productos", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        alert("Datos enviados correctamente");
    } catch (error) {
        console.log("Tenemos un error: ", error);
        alert("Tenemos un error");
    }
})

