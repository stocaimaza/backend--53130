import express from "express";
const router = express.Router(); 
import JugueteController from "../controllers/juguete.controller.js";
const jugueteController = new JugueteController(); 

router.get("/", jugueteController.obtenerJuguetes);
router.post("/", jugueteController.crearJuguete);

export default router; 