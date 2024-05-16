import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/JWT?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectados a la Base de Datos"))
    .catch( (error) => console.log("Houston tenemos un problema: ", error))