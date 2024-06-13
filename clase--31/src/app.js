//MOCK: Es una imitacion de un dato real. Es una simulación que generamos en el entorno de desarrollo para no manipular datos reales y para tener herramientas de trabajo de forma rapida. 
//Entonces yo a traves de un mock puedo simular de forma simple y rapida una base de datos de usuarios, productos, clientes, etc etc. 

//FAKER-js: 
//Instalamos: npm install @faker-js/faker

import express from "express"; 
import usuariosRouter from "./routes/usuarios.router.js"; 
const app = express(); 
const PUERTO = 8080; 


app.use("/", usuariosRouter); 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto de Mar del Plata`);
})

