const socket = io();

socket.on("productos", (data) => {
    renderProductos(data);
})

//Función para renderizar el listado de productos

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `
                            <p> ID: ${item.id} </p>
                            <p> Titulo:  ${item.title} </p>
                            <p> Precio: ${item.price} </p>
                            <button> Eliminar producto </button>
                        `;
        contenedorProductos.appendChild(card);
    
        //Agregamos el evento al boton de eliminar producto: 
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id)
        }) 
    })
}

//Eliminar producto: 

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}

//Agregar producto: 

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
})

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    socket.emit("agregarProducto", producto);
}