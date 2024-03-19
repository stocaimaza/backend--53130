const express = require("express");
const router = express.Router();
//import {Router} from "express";


let arrayProductos = [
    {nombre: "Fideos", descripcion: "Los mas ricos", precio: 100},
    {nombre: "Arroz", descripcion: "El que no se pasa", precio: 200},
    {nombre: "Helado", descripcion: "Mas frio que el corazon de tu ex", precio: 5000},
    {nombre: "Coca Cola", descripcion: "Cada dia mas cara", precio: 10000}
];


//Ruta

router.get("/", (req, res) => {
    const usuario = {
        nombre: "Tinki",
        apellido: "Winki",
        mayorEdad: true
    }


    res.render("index", {usuario, arrayProductos, titulo: "Plantillita"});
})

router.get("/contacto", (req, res) => {
    res.render("contacto");
})

module.exports = router; 

//export default router;