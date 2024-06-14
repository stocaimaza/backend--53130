const JuguetesModel = require("../models/juguetes.model.js"); 

class MongoDBJugueteDAO {
    async obtenerJuguetes() {
        try {
            return await JuguetesModel.find(); 
        } catch (error) {
            throw new Error("Error al obtener todos los juguetes"); 
        }
    }

    async crearJuguete(datosJuguete) {
        try {
            const juguete = new JuguetesModel(datosJuguete);
            return await juguete.save(); 
        } catch (error) {
            throw new Error("Error al crear un juguete");
        }
    }
}

module.exports = MongoDBJugueteDAO; 