const express = require("express");
const router = express.Router(); 

//Acá pueden importar los controladores:
const ProductoController = require("../controllers/productos.controller.js");
const productoController = new ProductoController(); 

router.get("/", productoController.getProductos); 
router.post("/", productoController.postProducto);

module.exports = router; 