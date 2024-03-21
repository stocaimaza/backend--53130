/* Generamos una instancia de Socket.io, ahora desde el lado del cliente */
const socket = io();

socket.emit("mensaje", "Hola mundo! Te escribo desde el cliente");

//Recibimos el "saludito" del servidor: 
socket.on("saludito", (data) => {
    console.log(data);
})

//Recibimos el array de usuarios: 

socket.on("usuarios", (data) => {
    const listaUsuarios = document.getElementById("lista-usuarios");

    listaUsuarios.innerHTML = "";

    data.forEach(usuario => {
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido} </li>`
    })
})