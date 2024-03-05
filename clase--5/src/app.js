/** CLASE 5 - NPM ADMINISTRADOR DE PAQUETES **/

//Temas de hoy: 

// Repasar que es Node y su uso en el backend
// Modulos propios, nativos y de terceros
// NPM y el proceso de instalacion
// Actualizacion de dependencias y politicas 

///////////////////////////////////////////////////////////

//Modulo: es un archivo que contiene código de JS que encapsula una funcionalidad especifica. Los modulos se usan para reutiliza codigo y mantenerlo organizado. 

//Modulos escritos por nosotros: 

const operaciones = require("./operaciones.js");
//"Require" es una funcion que me permite cargar o "requerir" algun modulo en particular. 

console.log(operaciones.suma(5,5));
console.log(operaciones.resta(10,5));
console.log(operaciones.multi(10,10));
console.log(operaciones.division(25,5));


//Modulos nativos: son los que vienen incluidos en Node JS. No es necesario instalarlos, solo importarlos para poder usarlos. 

//Los mas conocidos: 
//1) FileSystem: permite trabajar con el sistema de archivos de la compu. 
//2) Modulo HTTP: permite crear un servidor web. 
//3) Modulo Crypto: permite encriptar datos. 
//4) Modulo Path: permite trabajar con rutas de archivos y directorios. 
//5) Modulo Timers: setTimeout, setInterval.. etc. 
//6) Console: para mostrar mensajes por consola. 


//Modulos de terceros: no vienen incluidos en node y los tenemos que instalar nosotros. 

//Pasos para instalar modulos de terceros: 

//1) Instalamos el modulo de terceros desde la termina con el comando "npm install nombreModulo". 

//npm install moment
//npm i express


//Y si lo quiero borrar: npm uninstall moment

//Instalamos dependencias de desarrollo. (Esta dependencia solo la vamos a usar  en etapa de desarrollo )

//ejemplo: npm i nodemon -D
 
let cliente = "firualis";
console.log(cliente);

//Los scripts son comandos personalizados por nosotros mismo. 
//Para ejecutarlos coloquen la palabrita "run" antes. Menos en start. 

//Si queres revisar las dependencias globales:
//npm outdated -g
//npm update -g


