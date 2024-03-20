/** PRIMER ENTREGA DEL TP FINAL  **/

const express = require("express");
const app = express(); 
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Siii funciona");
})

//Rutas 
app.use("/api", productsRouter);
app.use("/api", cartsRouter);



app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})