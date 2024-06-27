/** CLASE 34 - LOGGERS Y TESTING DE PERFORMANCE  **/

//Temas de hoy: 
//1) Que son los loggers
//2) Winston
//3) Test de carga con Artillery
//4) Desafio 

//LOGGERS: es una herramienta que registra información importante sobre el funcionamiento de la aplicación mientras se ejecuta. Estos registros son útiles para diagnosticar problemas, rastrear eventos y ver el rendimiento del sistema. 

//LOS FLOGGERS TIENEN DOS CARACTERISTICAS PRINCIPALES: 

// - Podemos separar los mensajes en diferentes "niveles" y estos pueden ser configurados por nosotros mismos. 

// - Podemos enviar esa información a otros recursos, a partir de los elementos llamados "transportes". Entonces puedo enviar mis logs a base de datos, archivos, mails, incluso a la consola misma. 

//WINSTON: 
//Es una biblioteca popular de Logging para Node JS. 

//instalamos: npm i winston

import express from "express";
const app = express(); 
const PUERTO = 8080;
import addLogger from "./utils/logger.js";

//Middleware: 
app.use(addLogger);

//RUTA PARA TESTEAR WINSTON: 

app.get("/loggertest", (req, res) => {
    req.logger.http("Mensaje HTTP"); 
    req.logger.info("Mensaje INFO"); 
    req.logger.warning("Mensaje WARNING"); 
    req.logger.error("Mensaje ERROR"); 

    res.send("Logs generados");
})

//Rutas: 

app.get("/", (req, res) => {
    res.send("Olis, que hacen? ");
})

//Simulamos algunas peticiones: 

//OPERACION SIMPLE: 

app.get("/operacionsimple", (req, res) => {
    let suma = 0; 

    for ( let i = 0; i < 1000000; i++ ) {
        suma += i;
    }

    res.send({suma}); 
})

//OPERACION COMPLEJA: 

app.get("/operacioncompleja", (req, res) => {
    let suma = 0; 

    for ( let i = 0; i < 5e8; i++ ) {
        suma += i;
    }

    res.send({suma}); 
})

app.listen(PUERTO, () => {
    console.log(`Si no contesto mas llamen a los bomberos`);
})


//ARTILLERY: 
// Es una herramienta que me permite simular multiples peticiones de informacion a mi servidor, con la idea de testear su funcionamiento. 

//Se recomienda instalar de forma global: npm i artillery -g 

//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json