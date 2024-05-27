/** CLASE 26 - ARQUITECTURA POR CAPAS **/

//Ejercicio "Jugueteria":

import express from "express";
const app = express(); 
const PUERTO = 8080;
import "./database.js";
import jugueteRouter from "./routes/juguete.router.js";


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(express.static("./src/public"));


//Rutas
app.use("/juguetes", jugueteRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})