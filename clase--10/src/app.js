/** CLASE 10 - WEBSOCKETS **/

//Temas de hoy: 

//1) ¿Qué es Websockets?
//2) Socket.io


//1) Websocket es un protocolo de comunicación bidireccional en tiempo real. A diferencia de HTTP, donde el cliente envia una solicitud y el servidor responde.
//Websocket permite una comunicación continua y en tiempo real entre el cliente y el servidor. 

//La comunicación se realiza entre dos endpoints, cada endpoint recibe el nombre de "socket". 

//¿Como funciona?

//1) El cliente tiene que enviar una petición HTTP al servidor y esto se conoce como handshake ( apretón de manos )

//2) El servidor recibe la petición y procede a responder el saludo. A esto se lo conoce como "abrir la conexion". 

//3) A partir de este momento la comunicación es bidireccional entre el cliente y el servidor. 

////////////////////////////////////////////////////////////////////////////////

import express from "express";
import exphbs from "express-handlebars";
const app = express(); 
const PUERTO = 8080;
import viewsRouter from "./routes/views.router.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//Configuramos Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas

app.use("/", viewsRouter);

//Listen

const httpServer = app.listen(PUERTO, () => {
    console.log(`Esuchando en el puerto: ${PUERTO}`);
})

//Pasos para trabajar con socket.io

//1) Instalamos con npm: npm install socket.io

//2) Importamos el módulo: 
import { Server } from "socket.io";

//const socket = require("socket.io"); 

//3) Nos guardamos una referencia de nuestro servidor de express. 
//ejemplo httpServer (que tenemos lineas arriba )

//Armamos un array de usuarios: 

const usuarios = [
    {id: 1, nombre: "Lionel", apellido: "Scaloni"}, 
    {id: 2, nombre: "Lionel", apellido: "Messi"}, 
    {id: 3, nombre: "Pepe", apellido: "Argento"}, 
    {id: 4, nombre: "Moni", apellido: "Argento"}, 
    {id: 5, nombre: "Coky", apellido: "Argento"}, 
    {id: 6, nombre: "Paola", apellido: "Argento"}, 
]

const io = new Server(httpServer);
//Instancia de Socket.io del lado del servidor. 

io.on("connection", (socket) => {
    console.log("Un cliente se conecto");

    //Acá voy a escuchar el evento "mensaje", cuidado con el que el nombre del evento sea igual en el cliente y en el servidor. 
    socket.on("mensaje", (data) => {
        console.log(data);
    })

    //Ahora el servidor le va a enviar un mensaje al cliente: 
    socket.emit("saludito", "Hola Cliente, ¿cómo estás?"); 

    //Enviamos el array de usuarios: 
    socket.emit("usuarios", usuarios);
})

