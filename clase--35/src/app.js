/** CLASE 35 - CLUSTERIZACION && DOCKER **/

//Escalabilidad: se refiere a la capacidad de un sistema, proceso o recurso para manejar un aumento en la carga de trabajo. 

//Cuando hablamos de escalar un servidor, lo hacemos a partir de dos conceptos: 

//ESCALABILIDAD VERTICAL: Mejoramos el hardware para que el servidor pueda tener mejores recursos. Como siempre decimos, esto require de mayor inversion, espacio fisico y gente capacitada para mantener esos equipos. 

//ESCALABILIDAD HORIZONTAL: significa utilizar múltiples servidores, estos reciben el nombre de "nodos", los cuales trabajaran en equipo para resolver un problema en particular. 

//console.log(process.pid);

//NOTA: el proceso principal recibe el nombre de "Primary Process" (antiguamente Master), mientras que las multiples instancias se llamaran "Workers"

//USAREMOS EL MODULO NATIVO DE NODEJS CLUSTER 

import express from "express";
import cluster from "cluster";
import { cpus } from "os";
const numeroDeProcesadores = cpus().length;
//console.log(numeroDeProcesadores);

if (cluster.isPrimary) {
    //console.log("Proceso primario");

    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork();
    }

} else {
    //console.log("Soy un proceso worker, y mi pid es el siguiente: " + process.pid);

    const app = express();

    // app.get("/", (req, res) => {
    //     res.send("Peticion atendida por un proceso worker")
    // })

    app.get("/operacionsimple", (req, res) => {
        let suma = 0; 
        for ( let i = 0; i < 1000000 ; i++ ) {
            suma += i;
        }
        res.send({suma}); 
    })

    app.get("/operacioncompleja", (req, res) => {
        let suma = 0;
        for ( let i = 0; i < 5e8 ; i++ ) {
            suma += i; 
        }
        res.send({suma});
    })

    app.listen( 8080, () => console.log("Escuchando en el puerto 8080"));

}

//Comando para Artillery: 
//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

////artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json