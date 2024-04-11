//const mongoose = require("mongoose");
import mongoose from "mongoose";

//Definimos el esquema : "schema". 
//El "schema" es un objeto que nos permite definir la forma de los documentos. Configuramos el nombre de los campos y los tipos de datos que almacenarán . 

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    apellido: String, 
    edad: Number
})

//Difinir el modelo: 

const UsuariosModel = mongoose.model("usuarios", usuariosSchema);

export default UsuariosModel;
//module.exports = UsuariosModel;

