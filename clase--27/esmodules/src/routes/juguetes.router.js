import express from "express";
import JugueteController from "../controller/juguete.controller.js";
const jugueteController = new JugueteController();
const router = express.Router(); 

router.post("/", jugueteController.crearJuguete);
router.get("/", jugueteController.obtenerJuguetes);


export default router; 