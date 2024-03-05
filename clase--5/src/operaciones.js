// Declaro mis funciones: 

const suma = (a,b) => a + b;
const resta = (a,b) => a - b;
const multi = (a,b) => a * b;
const division = (a,b) => a / b;

//Dos formas de importar y exportar modulos: 
//Common JS 
//ES Module (llega en el año 2015)

module.exports = {
    suma,
    resta, 
    multi, 
    division
}
