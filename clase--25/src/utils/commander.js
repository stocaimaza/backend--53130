//Commander: librería que nos permite configurar nuestros argumentos de consola.
//instalacion: npm i commander

import { Command } from "commander";

const program = new Command(); 

//1 - Comando // 2 - La descripcion // 3 - Valor por default
program
    .option("-p <port>", "puerto en donde se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse();
//Finalizamos acá la configuracion. 

//console.log("Opciones: ", program.opts()); 

export default program;
