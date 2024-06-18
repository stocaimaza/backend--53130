/** CLASE 32 - OPTIMIZACION DEL SERVIDOR  **/

import express from "express";
const app = express();
const PUERTO = 8080;
import usuariosRouter from "./routes/usuarios.router.js"; 
import manejadorError from "./middleware/error.js";

//Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GZIP: es un algoritmo de compresion de datos ampliamente utilizado que fue creado en la decada del 90. Comprime los datos utilizado el algoritmo DEFLATE, es compatible con todos los navegadores web. 

//1) importamos el módulo: 

//import compression from "express-compression"; 

//2) Lo usamos como middleware: 

//GZIP: 
//app.use(compression());

//BROTLI: 
// app.use(compression({
//     brotli: {
//         enabled: true, 
//         zlib: {}
//         //zlib: es una dependencia interna de brotli que espera un objeto con diferentes niveles de compresion. 
//     }
// }));


//Ruta

// app.get("/", (req, res) => {
//     let string = "Hola coders, soy un string ridiculamente largo";

//     for (let i = 0; i < 5e4; i++) {
//         string += "Hola coders, soy un string ridiculamente largo";
//     }

//     res.send(string);
// })

app.use("/usuarios", usuariosRouter); 
app.use(manejadorError);
//IMPORTANTE! El middleware debe ser invocado despues de las rutas. 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

//Instalamos: npm install express-compression

//Sin compresión, los datos transferidos son de 2.3mb. 
//Con compresión, los datos son de 7.1kb
//Con Brotli, los datos son de 364b. 
