/** CLASE 25 - PROCESO PRINCIPAL DEL SERVIDOR  + GLOBAL & CHILD PROCESS **/

//Temas de hoy: 

//1) Objeto process
//2) Manejo de argumentos
//3) Commander JS
//4) Manejo de variables de entorno
//5) Listeners
//6) Child Process

/////////////////////////////////////////////////////////////////////////////

//Cada vez que ejecuto la consola node src/app.js se crea automaticamente el objeto process, y este objeto tiene informacion sobre el proceso en nuestra compu. 

//console.log(process);

//Si quiero saber en que directorio se esta ejecutando el proceso: 
//console.log(process.cwd());

//Obtener el ID del proceso: 
//console.log(process.pid);

//Si quiero conocer la cantidad de memoria que esta usando este proceso: 
//console.log(process.memoryUsage());

//Si quiero conocer la version del proceso: 
//console.log(process.version);

//Si queremos finalizar un proceso: 
//process.exit();

//console.log("Texto adicional");

//2) Manejo de argumentos: 

//console.log(process.argv);

//Levantamos un servidor muy basico: 

import express from "express";
const app = express(); 
import mongoose from "mongoose";
import UserModel from "./models/usuarios.model.js";
import configObject from "./config/config.js";

const { mongo_url, puerto } = configObject;

//Rutas

app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send("Error del servidor, vamos a re morir ahhh");
    }
})

//Iniciamos el servidor. 
app.listen(puerto);

//Nos conectamos con MongoDB: 

mongoose.connect(mongo_url)
    .then(() => console.log("Conectados a la BD"))
    .catch(() => console.log("error fatal"))

//6) Child Process: 

// function operacionCompleja() {
//     let resultado = 0;

//     for ( let i = 0; i < 5e9; i++ ){
//         resultado += i; 
//     }

//     return resultado; 
// }

// app.get("/suma", (req, res) => {
//     const resultado = operacionCompleja(); 
//     res.send(`El resultado de la operacion compleja: ${resultado} ` );
// })

//Pasitos para realizar el forkeo: 

//1) Separamos la función compleja a otro módulo
//2) Modificamos y la dejamos disponible para cuando el padre la solicite. 
//3) Ejecutamos la ruta. 

import {fork} from "child_process"; 

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionCompleja.js"); 
    child.send("iniciando"); //Acá el proceso padre le envia un mensaje al hijito. 
    child.on("message", resultado => {
        res.send(`El resultado de la operacion es: ${resultado}`);
    })
})
