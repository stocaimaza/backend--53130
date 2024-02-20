/// Clase 1 - Principios básicos de JS. 

//Temas de hoy: 

//1) Platillas literales. 
//2) Funciones. 
//3) Scope. 
//4) Closures. 
//5) Clases y POO en JS. 

//1) Las platillitas literales me permiten concatenar strings de una foma más sencilla y legible.

let mascota = "Fatiga";

let mascotaEdad = 5;

console.log("Nuestro perro " + mascota + " tiene " + mascotaEdad + " años");

//Ahora: 
//`` alt + 96
console.log(`Nuestro perro ${mascota} tiene ${mascotaEdad}`);
//Lo que hacemos acá es una interpolación de variables ${}

//Tambien podemos ejecutar cualquier código de JS:
console.log(`Nuestro perro ${mascota} tiene ${mascotaEdad + 1}`);

//2) Funciones: son bloques de código que podemos encapsular y reutilizar en nuestro programa. No se olviden, que una función debe tener una sola responsabilidad. 
//CODEMETRICS, extensión de VS que nos ayuda a realizar buenas funciones.  

//Vamos a tener dos categorias de funciones en JS: 

//FUNCIONES DECLARATIVAS: 

//1) Las declaramos:

function saludar(curso) {
    console.log("Hola Comision! " + curso);
}

//2) Las invocamos: 
saludar("Backend");

//¿Se puede invocar una función antes de su declaración? 
//Se puede hacer gracias al "hoisting" (elevar), que es un proceso interno que realiza el lenguaje durante la lectura del código, en donde eleva las declaraciones de las funciones. (Ojota! Solo las declarativas);

//FUNCIONES EXPRESIVAS: 
//Estas se definen utilizando una expresión. 
//Las vamos a trabajar, en general, asignadolas a alguna variable. 

let nuevoSaludo = function (curso) {
    console.log("La mejor comision del condando " + curso);
};

nuevoSaludo("Backend");

//Las funciones anónimas siempre estuvieron en JS, incluso en sus primeras versiones. Lo que si llega en ES6 son las: 

//Funciones Flecha: 
//Estas funciones son una forma mas corta y simple de escribir funciones expresivas. 

//flecha => 

const ultimoSaludo = (curso) => {
    console.log("Todos amamos el curso de " + curso);
}

ultimoSaludo("Backend!!!");

//Forma mas resumida: 

const chau = curso => console.log("chauuu " + curso);

chau("Patin artistico");

//3) SCOPE: es el alcance que tiene las variables dentro de nuestro programa. 
//En JS tenemos dos tipos de scope: 

//Scope global: las variables declaradas en este scope pueden ser accedidas desde cualquier parte del programa. 

//Scope local: las variables declaradas en el scope local viven dentro del bloque de llaves donde fueron creadas. 

//Ejemplo: 

let global = 2024;

function saludito() {
    console.log("Hola, estamos en el año " + global);
    let curso = "Backendo";
    console.log("Curso de " + curso);
}

saludito();
//console.log(curso);

//4) CLOSURES: 
//Los cierres o clausulas en JS es un concepto que se refiere a la capacidad de una función anidada de acceder a las variables de su función padre. 


function padre() {
    let deuda = 15000000;
    function anidada() {
        console.log(deuda);
    }
    return anidada;
    //Retornamos la funcion anidada, creando el closure. 
}

let clausula = padre();
clausula();

//¿Que es lo que ocurre en este ejemplo? La función padre padre termina su ejecución, pero la función anidada puede acceder a la variable deuda. 
//Esto se usaba para simular la existencia de variables privadas, en ese momento no existian pero con la llegada de ES6 y las clases pasaron un poco al desuso. 

//5)Clases: son moldes que nos permiten crear objetos con caracteristicas similares. 

//Ejemplo vamos a crear la clase persona: 

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    //Podemos agregar métodos a la clase: 

    saludar() {
        console.log("Hola, soy " + this.nombre);
    }

    despedir() {
        console.log("Chau, me fui, soy  " + this.nombre);
    }

    //Métodos estáticos: 
    static especie() {
        console.log("Soy un ser humano");
    }

    static planeta = "Tierra";
}

//Vamos a crear una instancia de la clase Persona: 

const coky = new Persona("Coky", 30);
console.log(coky);
coky.saludar();
coky.despedir();

//Podemos agregar métodos estáticos, que son métodos que se ejecutan sin necesidad de crear una instancia de la clase. 

//¿Como ejecuto un método estatico?

Persona.especie();
console.log(Persona.planeta);

//Vamos a crear una clase que herede de la clase Persona. 

class Empleado extends Persona {
    constructor(nombre, edad, sueldo) {
        super(nombre, edad);
        this.sueldo = sueldo;
    }

    saludar() {
        console.log("Hola soy " + this.nombre + " y mi salario es de " + this.sueldo);
    }
}

const empleado = new Empleado("Paola", 35, 1000000);
console.log(empleado);
empleado.saludar();