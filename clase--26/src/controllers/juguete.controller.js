import jugueteService from "../services/index.js";

class JugueteController {
    async crearJuguete(req, res) {
        const {nombre, categoria, precio} = req.body; 
        try {
            let juguete = await jugueteService.crearJuguete({nombre, categoria, precio});
            res.json(juguete);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }


    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteService.obtenerJuguetes();
            res.json(juguetes);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default JugueteController; 