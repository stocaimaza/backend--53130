const fs = require("fs");

class FileSystemJugueteDAO {
    async crearJuguete(datosJuguete) {
        try {
            const juguetes = await this.leerArchivo();
            juguetes.push(datosJuguete);
            await this.escribirArchivo(juguetes);
            return datosJuguete;
        } catch (error) {
            throw new Error("Error al crear un juguete en archivo");
        }
    }

    async obtenerJuguetes() {
        try {
            const juguetes = await this.leerArchivo();
            return juguetes;
        } catch (error) {
            throw new Error("Error al obtener los juguetes del archivo");
        }
    }

    //Metodos auxiliares para manejar archivos: 

    async leerArchivo() {
        try {
            const data = await fs.promises.readFile("./src/data/juguetes.json");
            return JSON.parse(data);
        } catch (error) {
            throw new Error("Error al leer el archivo");
        }
    }

    async escribirArchivo(data) {
        try {
            await fs.promises.writeFile("./src/data/juguetes.json", JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error("Error al guardar el archivo");
        }
    }
}

module.exports = FileSystemJugueteDAO; 