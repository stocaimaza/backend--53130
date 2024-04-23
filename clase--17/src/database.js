import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/Pizzeria?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Todo perfecto, la vida nos sonrie!"))
    .catch((error) => console.log("Dedicate a corte y confeccion: ", error) )