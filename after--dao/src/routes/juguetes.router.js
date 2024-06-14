const express = require("express");
const router = express.Router(); 

//Nos traemos el controlador: 
const JugueteController = require("../controllers/juguete.controller.js"); 
const jugueteController = new JugueteController(); 

router.get("/", jugueteController.obtenerJuguetes); 
router.post("/", jugueteController.crearJuguete); 

module.exports = router;