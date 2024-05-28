const ProductoModel = require("../models/productos.model.js"); 
const respuesta = require("../utils/reutilizables.js"); 

class ProductoController {
    async getProductos(req, res) {
        try {
            const productos = await ProductoModel.find(); 
            respuesta(res, 200, productos);
        } catch (error) {
            respuesta(res, 500, "Error al obtener los productos");
        }
    }

    async postProducto(req, res) {
        try {
            const nuevoJuguete = req.body; 
            await ProductoModel.create(nuevoJuguete); 
            respuesta(res, 201, "Producto creado correctamente"); 
        } catch (error) {
            respuesta(res, 500, "Error al crear producto"); 
        }
    }

}

module.exports = ProductoController; 