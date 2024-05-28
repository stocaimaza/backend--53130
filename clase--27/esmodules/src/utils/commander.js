import { Command } from "commander";
const program = new Command(); 

//Recuerden: 

//1 - Comando, 2 - La descripcion, 3 - Valor por default

program 
    .option("--mode <mode>", "modo de trabajo", "produccion");
program.parse();

export default program; 
