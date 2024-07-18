import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||3000;

// Configura la opción strictQuery para evitar la advertencia
mongoose.set('strictQuery', false); // Cambia a true si prefieres el nuevo comportamiento

// Conectar a la base de datos
mongoose.connect("mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB', error);
  });

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

//1) Instalamos swagger: https://swagger.io
//npm install swagger-jsdoc swagger-ui-express

//swagger-jsdoc: nos deja escribir la configuracion en un archivo .yaml y a partir de ahi se genera el apidoc. 

//swagger-ui-express: nos permite linkear una interfaz grafica para poder visualizar la documentacion. 

//2) Importamos los módulos: 
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from "swagger-ui-express"; 

//3) Crear un objeto de configuracion: swaggerOptions

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de la App Adoptame", 
            description: "App dedicada a encontrar familias para los perritos de la calle"
        }
    }, 
    apis: ["./src/docs/**/*.yaml"]
}

//4) Conectamos Swagger a nuestro servidor de Express: 

const specs = swaggerJSDoc(swaggerOptions); 
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs)); 