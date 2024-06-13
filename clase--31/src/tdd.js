/** CLASE 31 - TEST Y MOCKS **/

//TDD: significa "Test Driven Development" o "Desarrollo Orientado a Pruebas". 
//Es una metodología  de desarrollo de Software que consiste en pensar y escribir las pruebas que debe pasar determinada función, incluso antes de escribir el código. 

//En TDD vamos a dividir el trabajo en 3 etapas: 

//1) Escribir una prueba fallida
//2) Hacer que la prueba pase
//3) Refactorizar

//Ejemplo con la función SUMA. 

//1: 

// const suma = (numeroA, numeroB) => {

//     //Test 2: 
//     if (!numeroA || !numeroB) {
//         return 0;
//     }
//     //Test 1: 
//     if (typeof numeroA !== "number" || typeof numeroB !== "number") {
//         return null;
//     }

//     //Test 3: 
//     let resultado = numeroA + numeroB; 
//     return resultado;
// }

// PARA RESOLVER EL TEST 4 VAMOS A TENER QUE MODIFICAR TODA LA FUNCIÓN PARA PODER RECIBIR N PARAMETROS: 

// const suma = (...numeros) => {
//     //TEST 2: debe retornar 0 si no se pasa ningun parametro
//     if (numeros.length === 0) {
//         return 0;
//     }

//     //TEST 1: retornamos null si un dato no es number: 
//     let banderita = true; 
//     for (let i = 0; i < numeros.length && banderita; i++ ) {
//         if ( typeof numeros[i] !== "number" ) {
//             banderita = false; 
//         }
//     }
//     if ( banderita !== true ) {
//         return null; 
//     }

//     //TEST 3 Y 4: sumar 2 o mas elementos
//     let resultado = 0; 
//     for ( let i = 0; i < numeros.length; i++ ){
//         resultado += numeros[i]; 
//     }
//     return resultado;
// }

//PASO 3: Refactorizar
//Buscamos sintetizar y hacer mas legible nuestro codigo. 

const suma = (...numeros) => {
    if( numeros.length === 0) return 0; 
    if( !numeros.every( num => typeof num === "number")) return null; 
    return numeros.reduce((acumulador, elemento) => acumulador + elemento, 0);
}

//Imaginemos diferentes escenarios que debe superar mi función: 

//1) La función debe retornar NULL si algun parametro no es numerico. 
//2) La función debe retornar 0 si no se pasa ningun parametro. 
//3) La función debe poder realizar la suma correctamente. 
//4) La función debe poder realizar la suma con cualquier cantidad de numeros. 

let testPasados = 0;
let testTotales = 4;

//TEST 1: 
console.log("1) La función debe retornar NULL si algun parametro no es numerico.");
let resultado1 = suma("2", 3);
if (resultado1 === null) {
    console.log("Test 1 Pasado!");
    testPasados++;
} else {
    console.log("El test 1 no se paso, se esperaba null pero se recibio: " + resultado1);
}

console.log("-------------------------------------------------------------------");

//TEST 2: 
console.log("2) La función debe retornar 0 si no se pasa ningun parametro.");
let resultado2 = suma();
if (resultado2 === 0) {
    console.log("Test 2 pasado!");
    testPasados++;
} else {
    console.log("El test 2 no se pasó, se esperaba 0 pero se recibio: " + resultado2);
}

console.log("-------------------------------------------------------------------");

//TEST 3: 

console.log("3) La función debe poder realizar la suma correctamente. ");
let resultado3 = suma(2, 3);
if (resultado3 === 5) {
    console.log("Test 3 pasado!");
    testPasados++;
} else {
    console.log("El test 3 no se pasó, se esperaba 5 pero se recibio: " + resultado3);
}

console.log("-------------------------------------------------------------------");

//TEST 4: 
console.log("4) La función debe poder realizar la suma con cualquier cantidad de numeros.");
let resultado4 = suma(1, 2, 3, 4, 5);
if (resultado4 === 15) {
    console.log("Test 4 pasado!");
    testPasados++;
} else {
    console.log("El test 4 no se paso, se esperaba 15 pero se recibio: " + resultado4);
}

console.log("-------------------------------------------------------------------");

if (testPasados === testTotales) {
    console.log("Felicitaciones, todos los test se pasaron con exito! Tu vida es un ejemplo, tus padres se equivocaban estar en la compu todo el dia es lo tuyo!");

} else {
    console.log("Se pasaron: " + testPasados + " de un total de " + testTotales);
}

//2) Vamos a hacer que las pruebas pasen. 