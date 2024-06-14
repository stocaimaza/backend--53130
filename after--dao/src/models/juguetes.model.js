const mongoose = require("mongoose");

const juguetesSchema = new mongoose.Schema({
    nombre: String,
    categoria: String, 
    precio: Number
}); 

const JuguetesModel = mongoose.model("juguetes", juguetesSchema);

module.exports = JuguetesModel;