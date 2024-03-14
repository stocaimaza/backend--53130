//Common JS: 
//const express = require("express");

import express from "express";
const router = express.Router();

//Array de mascotas: 
const pets = []; 

//Rutas Mascotas: 

//Creamos una ruta para obtener el listado de mascotas:
router.get("/api/pets", (req, res) => {
    res.send(pets);
})

router.post("/api/pets", (req, res) => {
    const nuevaMascota = req.body; 
    pets.push(nuevaMascota);
    res.send({message: "Mascota creada correctamente"});
})

//Tenemos que exportarlo: 
export default router;

//Common JS: 
//module.exports = router;