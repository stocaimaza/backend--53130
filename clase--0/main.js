/** REPASITO JS **/

//Los podemos dividir en dos grupos: 

//1.1 Tipo primitivo. 

//Tipo number: 

56545565
4564.5454

//Datos numericos que pueden ser enteros o decimales. A los decimales le llamamos "punto flotante". Este tipo de datos esta destinado a ser usado en operaciones matematicas. 

//Tipo String: 

"Esto es un string"
'Esto es un string tambien '


//Los strings son cadenas de texto. Se pueden escribir con comillas simples o dobles. 


//Tipo Boolean: 

true 
false

//Son valores que pueden ser verdaderos o falsos. Los vamos a usar generalemente para tomar decisiones en nuestro código, junto a bucles y condicionales. 

//Tipo undefined

undefined

//Tipo de dato indefinido.
//Es un valor que se asigna a una variable cuando nose le ha asignado ningun valor todavia. 

//Tipo null: 

null

//Es un valor que se le asigna a una variable cuando queremos que no tenga ningun valor. Es la ausencia intencional de un valor. 

//Variables: 
//Es un espacio de memoria que reservamos para almacenar algun dato importante para nuestra aplicacion. 

//Declaramos variables con la palabra reservada "let". 

let alumno; 

console.log(alumno);
//Acá podemos chequear que me retorna undefined.

//Asignamos un valor: 

alumno = "Tinki Winki";
console.log(alumno);

alumno = 10;
console.log(typeof alumno);

//Tambien puedo inicializar variables, que significa que le asignamos un valor al momento de declararlo: 

let profesor = "Dipsy";
console.log(profesor);

//Las constantes son variables que no pueden cambiar su valor. Se declaran con la palabra reservada "const". Una vez que se le asigna un valor a una constante, no se le puede asignar otro. 

const nacimiento = 1987;
// nacimiento = 1990; 
console.log(nacimiento);

//Expresiones: es una combinacion de valores, variables y operadores que se evaluan para producir un resultado. 


//Expresión booleana: 

let ejemploA = 10 < 5; //true
console.log(ejemploA);

//1.2 Tipo Objeto 
//Tenemos los objetos, arrays y funciones

//Array: una coleccion de datos. Puede ser cualquier tipo de dato. 

let array = [1, "hola", true, null, [1,2,3]];
console.log(array);

//A cada elemento del array se puede acceder a traves de un indice. Este es un numero entero que representa la posicion del elemento en el array. Comienza en el indice 0. 

//Los arrays son dinamicos, pueden cambiar su tamaño en tiempo de ejecucion. 

console.log(array[0]);

//Tipo Object

let perro = {
    nombre: "Fatiga", 
    edad: 11, 
    raza: "Callejero"
}


console.log(perro.nombre);

//Los métodos de este perrito lo vemos la clase que viene. 

//Ciclos: nos permiten ejecutar un bloque de código cierta cantidad de veces. En JS tenemos dos tipos de ciclos: ciclos por conteo y ciclos condicionales. 

//FOR: nso permite ejecutar un bloque de código una cantidad determinada de veces.

for(let i = 0; i < 10; i++) {
    console.log(i);
}

//El ciclo for tiene 3 partes: 

//Desde: donde se inicializa el contador. 
//Hasta: donde evualua la condicion. 
//Actualizacion: donde se actualiza el contador. 

//WHILE: me permite ejecutar un bloque de código mientras se cumpla una condición. 

// let nombre = prompt("Ingrese su nombre (para salir presione: salir) ");

// while(nombre !== "salir") {
//     console.log("Hola " + nombre);
//     nombre = prompt("Ingrese su nombre (para salir presione: salir) ");
// }


//Do - While: es similar al while, pero se ejcuta al menos una vez antes de evaluar la condicion. 

// const password = "1234";

// let passUsuario; 

// do{
//     passUsuario = prompt("Ingrese su contraseña");

// }while(passUsuario !== password)

//For of: este ciclo me permite ejecutar alguna accion sobre cada elemento de un objeto iterable (objeto, array, string). 

let frutas = ["manzana", "pera", "banana", "vino"]; 

for (let fruta of frutas) {
    console.log(fruta);
}

//For In: 
//La diferencia enter el for of y el for in es que el for of itera sobre los valores de un objeto iterable, y el for in itera sobre las claves del objeto. 

let clienteNuevo = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30
}

for (let clave in clienteNuevo) {
    console.log(clave);
}