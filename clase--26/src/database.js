import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectados a la BD"))
    .catch( (error) => console.log("Tenemos un error:", error))