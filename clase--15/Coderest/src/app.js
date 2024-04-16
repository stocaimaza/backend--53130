/** PRACTICA INTEGRADORA 1  **/

//Temas de repaso: 

//Clases
//Express
//Router y Multer
//Express-Handlebars
//MongoDB y Mongoose

//Actividad: vamos a generar un Pinterest, almacenando nuestros usuarios en MongoDB. 

//////////////////////////////////////////////////////////////////////////////////////

import express from "express";
const app = express(); 
const PUERTO = 8080;
import imagenRouter from "./routes/imagen.router.js";
import multer from "multer";
import "./database.js";
import exphbs from "express-handlebars";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(express.static("./src/public"));
//Configuramos Multer: 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
app.use(multer({storage}).single("image"));

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas 
app.use("/", imagenRouter);

//Iniciamos el servidor
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})