"use strict";
//Inician el proyecto: tsc --init 
//Configuran el tsconfig.json
//Compilan con tsc
//Tipos de datos: 
let nombre = "Juan";
const apellido = "Perez";
//Number
const nacimiento = 1960;
//Booleano: 
let trabaja = true;
//Undefined / Null : 
let variableUndefined = undefined;
const datoNull = null;
//Objetos: 
const persona = {
    nombre: "Juan",
    edad: 30
};
let alumnito = {
    nombre: "Coky",
    edad: 18
};
//Funciones: 
function suma(numeroA, numeroB) {
    return numeroA + numeroB;
}
console.log(suma(155, 5));
//Ejemplo con funcion flechiña:
const restar = (a, b) => a - b;
//Aca ya interpreta que el retorno es number. 
console.log(restar(100, 50));
//Clases: 
class Perro {
    constructor(raza, edad) {
        this.raza = raza;
        this.edad = edad;
    }
    ladrar() {
        console.log("guaaaaaau guau guau");
    }
}
//Instancia de Firulais: 
const firulais = new Perro("Ladrador", 5);
console.log(firulais);
