import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/Coderest?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectado a MONGODB, todo es un exito!"))
    .catch( (error) => console.log("Tenemos un error, no sirvo para esto, me voy a diseño de interiores", error))

    