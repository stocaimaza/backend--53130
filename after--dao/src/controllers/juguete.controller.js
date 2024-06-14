//Importaciones: 
// const MongoDBJugueteDAO = require("../dao/mongoDBJugueteDAO.js"); 
// const MemoryJugueteDAO = require("../dao/memoryJugueteDAO.js");
// const FileSystemJugueteDAO = require("../dao/fileSystemJugueteDAO.js"); 
// const jugueteService = new FileSystemJugueteDAO(); 

//Caso con Factory: 
const DAOFactory = require("../dao/factory.js");
const jugueteService = new DAOFactory();

//Clase controller: 

class JugueteController {
    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteService.obtenerJuguetes();
            res.json(juguetes);
        } catch (error) {
            res.status(500).send("Error del servidor, este finde llueve");
        }
    }

    async crearJuguete(req, res) {
        const datosJuguete = req.body;
        try {
            const juguete = await jugueteService.crearJuguete(datosJuguete);
            res.json(juguete);
        } catch (error) {
            res.status(500).send("Error del servidor, los mosquitos seran gigantes");
        }
    }
}

module.exports = JugueteController; 