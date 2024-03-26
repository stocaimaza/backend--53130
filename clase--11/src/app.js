/** CHAT COMUNITARIO COMISIÓN 53130 **/
//Instalamos nodemon -D
//express socket.io express-handlebars

const express = require("express");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const app = express();
const PUERTO = 8080;

//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configuramos Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res) => {
    res.render("index");
})

//Listen
const httpServer =  app.listen(PUERTO, () => {
    console.log(`Escuchando en el Puerto: ${PUERTO}`);
})

//Me guardo una referencia del servidor. 

//Generamos una instancia de Socket.io del lado de backend.
const io = new socket.Server(httpServer);

let messages = [];

//Establecemos la conecccccctioooon.

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", data => {
        messages.push(data);

        //Emitimos mensaje para el cliente, con todo el array de datos: 
        io.emit("messagesLogs", messages);

    })
})


