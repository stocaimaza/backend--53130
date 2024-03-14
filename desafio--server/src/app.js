/** DESAFIO CLASE 6 **/

import express from "express";
const app = express();
const PUERTO = 8080;

import ProductManager from "./product-manager.js";
const productManager = new ProductManager("./src/productos.json");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Rutas 


app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {

        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})


app.get("/products/:pid", async (req, res) => {

    const id = req.params.pid;

    try {

        const producto = await productManager.getProductById(parseInt(id));
        if (!producto) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})



app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto 8080`);
});