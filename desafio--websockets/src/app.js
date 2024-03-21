/** PRIMER ENTREGA DEL TP FINAL  **/

const express = require("express");
const app = express(); 
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Configuramos Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas 
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use("/", viewsRouter);



app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})