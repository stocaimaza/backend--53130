//Inician el proyecto: tsc --init 
//Configuran el tsconfig.json
//Compilan con tsc

//Tipos de datos: 
let nombre: string = "Juan"; 
const apellido: string = "Perez"; 

//Number
const nacimiento : number = 1960; 

//Booleano: 
let trabaja : boolean = true; 

//Undefined / Null : 

let variableUndefined : undefined = undefined; 

const datoNull : null = null; 

//Objetos: 

const persona : {nombre: string, edad: number} = {
    nombre: "Juan", 
    edad: 30
}

//Una interfaz es una estructura que define un conjunto de propiedades y metodos que un objeto debe implementar. 

interface Alumno {
    nombre: string, 
    edad: number
}

let alumnito: Alumno =  {
    nombre: "Coky", 
    edad: 18
}

//Funciones: 

function suma(numeroA: number, numeroB: number) : number{
    return numeroA + numeroB; 
}

console.log(suma(155,5));

//Ejemplo con funcion flechiña:
const restar = (a: number, b: number) => a - b; 
//Aca ya interpreta que el retorno es number. 

console.log(restar(100,50)); 


//Clases: 

class Perro {
    raza: string; 
    edad: number; 
    constructor(raza: string, edad: number) {
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
