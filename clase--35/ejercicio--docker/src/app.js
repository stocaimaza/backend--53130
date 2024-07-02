/** EJEMPLO CON DOCKER  **/

import express from "express";
const app = express(); 
const PUERTO = 8080; 

app.get("/", (req, res) => {
    res.send("Hola mundo, estoy trabajando en Docker!"); 
})

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})