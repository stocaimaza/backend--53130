import JugueteModel from "../models/juguete.model.js";

class JugueteRepository {
    async crearJuguete(datosJuguete) {
        try {
            const juguete = new JugueteModel(datosJuguete);
            return await juguete.save();
        } catch (error) {
            throw new Error("Error al crear el juguete"); 
        }
    }

    async obtenerJuguetes(){
        try {
            return await JugueteModel.find(); 
        } catch (error) {
            throw new Error("Error al obtener los juguetes");
        }
    }
}

export default JugueteRepository; 