const {Command} = require("commander");
const program = new Command();

//1 - Comando // 2 - La descripcion // 3 - Valor por default

program
    .option("--mode <mode>", "entorno de trabajo", "produccion")
    .option("-p <port>", "puerto donde se inicia el servidor", 8080)
program.parse(); 

module.exports = program; 


