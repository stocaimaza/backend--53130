/** CLASE 2 **/

//Continuamos... 

//DESESTRUCTURACIÓN: Esta herramienta nos permite extraer datos de un array u objeto de una manera mas sencilla y legible. 

const pelicula = {
    titulo: "El Padrino", 
    director: "Francis Ford Coppola",
    genero: "Drama",
    lanzamiento: 1972
}

//Antes de ES6

let titulo = pelicula.titulo; 

console.log(titulo);
//De esta forma estoy copiando el valor de la propiedad titulo del objeto pelicula a la variable "titulo"

//con ES6: 

let {titulo:tituloPeli, director, genero, lanzamiento} = pelicula;

console.log(genero);
console.log(lanzamiento);

tituloPeli = "Volver al futuro";
console.log(tituloPeli);
console.log(pelicula.titulo);
//Recuerden que estamos trabajando con copias de datos. El objeto original no se modifica. 

//Ejemplo con Arrays: 

const numeros = [1, 2, 3, 4, 5]; 

//Antes de ES6

let uno = numeros[0];
let dos = numeros[1];
let tres = numeros[2];
console.log(uno, dos, tres);

//ES6

let [,, indiceDos] = numeros; 

//console.log(indiceCero);
//console.log(indiceUno);
console.log(indiceDos);

//Valores por defecto: Nos permite asignar valores por defecto a los parámetros de las funciones

function saludar(nombre = "Invitado") {
    console.log(`Hola ${nombre} bienvenido!`);
}

//alt + 96 = ``

saludar("Samuel");
saludar(); 

//Trabajo por modulos: 

//Si quisiera importar el array productosMarolio que exportamos en el archivo datos.js, lo hago de la siguiente manera: 

import productosMarolio from "./datos.js";

console.log(productosMarolio);

//Operador Spread: Operador de propagación. 
//Nos permite desparramar los elementos de un array u objeto de forma individual en otro contexto. Que este contexto puede ser un array, un objeto o una función 

const arrayNombres = ["Samuel", "Federico", "Luciana", "Amelia"]; 

console.log(...arrayNombres);

//Esto es lo mismo que hacer: 

console.log(arrayNombres[0], arrayNombres[1], arrayNombres[2], arrayNombres[3]);

//Copia de objetos: 

const coky = {
    nombre: "Coky",
    apellido: "Argento", 
    edad: 16
}

//const coky2 = coky;
//Esto no lo tenemos que hacer! Porque igualamos la referencia en memoria. No estamos creando un objeto nuevo. 

const coky2 = {...coky}; 

coky.nombre = "Paola";
console.log(coky);
console.log(coky2);

//Arrays: 

let numeros2 = [1,2,3,4,5];
let numeros3 = [6,7,8,9,10]; 

let numerosConcatenados = [...numeros2, ...numeros3];
console.log(numerosConcatenados);

//Clases: 

class Persona {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre; 
        this.apellido = apellido; 
        this.edad = edad;  
    }

    saludar() {
        console.log(`Hola, soy el ${this.nombre} de ${this.apellido}`);
    }
}

const persona = new Persona("Doble", "Luis Miguel", 50);
console.log(persona);

persona.saludar();


//Herencia: 

//Si quiero que promedio sea una variable privada, tengo que agregarle el # antes del nombre de la variable.
//Esto se suma en ECMA22. 

class Estudiante extends Persona {
    #promedio;
    constructor(nombre, apellido, edad, carrera, promedio) {
        super(nombre, apellido, edad);
        this.carrera = carrera; 
        this.#promedio = promedio; 
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} ${this.apellido} y estudio ${this.carrera}`);
    }

    //Para trabajar con esas variables privadas, tengoq eu crear un metodo que me perte acceder a ellas. 

    get getPromedio() {
        return this.#promedio;
    }
}



const estudiante = new Estudiante ("Juancito", "Perez", 20, "Ingenieria en Sistemas", 10); 

console.log(estudiante);

estudiante.saludar();

console.log(estudiante.promedio);

console.log(estudiante.getPromedio); 
//Me deberia decir 10. 

//Variables y metodos estaticos. 
//Estan asociados a la clase en si. Para poder utilizarlos no require que se generauna isntancia de clase. 

class Contador {
    static cantidad = 0;

    constructor() {
        Contador.cantidad++;
    }

    static obtenerCantidad() {
        return Contador.cantidad;
    }
}

const contador1 =  new Contador(); 
const contador2 =  new Contador(); 
const contador3 =  new Contador(); 
const contador4 = new Contador();

console.log(Contador.obtenerCantidad());

//¿Que es un prototipo? 
//Un prototipo es un objeto del cual otro objeto hereda sus propiedades y metodos. 

const animal = {
    especie: "Animal", 
    comer: function() {
        console.log("Comiendo");
    }
}

const gato = {
    raza: "Gato", 
    maullar: function() {
        console.log("Miaaaaaauuu");
    }
}

gato.__proto__= animal; 

//Aclaramos que __proto__ es una propiedad que tienen todos los objetos que nos permite acceder al prototipo del objeto pero no es recomendable utilizar en producción, ya que es una propiedad privada del lenguaje. 


//De esta manera el objeto gato hereda las propiedades del objeto animal. 
//Animal es el prototipo de gato. 

gato.comer();
gato.maullar();