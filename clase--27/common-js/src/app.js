/** CLASE 27 - ARQUITECTURA DEL SERVIDOR: DISEÑO  **/

//Instalamos: nodemon express mongoose

//Temas:

//1) Consejos para desarrollar un servidor
//2) Patrones de diseño
//3) Singleton para MongoDB
//4) Comunicación entre el front y el back. 

///////////////////////////////////////////////////////////

//1) Codigo reutilizable. 

//Levantamos un servidor: 

const express = require("express");
const app = express(); 
const PUERTO = 8080; 
require("./database.js");
const productosRouter = require("./routes/productos.router.js");
const cors = require("cors");

//Middleware: 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
app.use(cors());

//Rutas
app.use("/productos", productosRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})