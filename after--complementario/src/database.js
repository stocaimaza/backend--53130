//Acá hacemos la conexión con MONGODB: 

//1) Instalamos mongoose: npm i mongoose. 
const mongoose = require("mongoose");

//2) Crear una conexión con la base de datos

mongoose.connect("tubd")
    .then(() => console.log("Conexion exitosa"))
    .catch((error) => console.log("Error en la conexion", error))

