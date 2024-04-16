/** PRACTICA INTEGRADORA 1  **/

//Temas de repaso: 

//Clases
//Express
//Router y Multer
//Express-Handlebars
//MongoDB y Mongoose

//Actividad: vamos a generar un Pinterest, almacenando nuestros usuarios en MongoDB. 

//////////////////////////////////////////////////////////////////////////////////////

import express from "express";
const app = express(); 
const PUERTO = 8080;
import imagenRouter from "./routes/imagen.router.js";
import "./database.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(express.static("./src/public"));

//Rutas 
app.use("/", imagenRouter);

//Iniciamos el servidor
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})