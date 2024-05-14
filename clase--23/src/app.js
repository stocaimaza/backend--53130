/** CLASE 23 - RUTEO AVANZADO **/

//Temas de hoy: 

//1) Expresiones regulares
//2) Restringir parametros
//3) Validar parametros
//4) Custom Router
//5) Custom Response

//EXPRESIONES REGULARES: son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto. 
//Por ejemplo: validar si el texto ingresado por el usuario corresponde a un email : "nombre@dominio.com". 

//Ejemplo con un correo electronico: 

let correoIngresado = "lionel@messi.com";
let correoFalso = "tinkiwinki";

const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(patronCorreo.test(correoIngresado));
console.log(patronCorreo.test(correoFalso));


//Ejemplo con un número de tel. 

//Esperamos este formato: (xxx) xxx - xxxx

const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;

let telefonoIngresado = "(223) 669-2944";
let telefonoFalso = "1234";
//Telefono de Bruno, si lo quieren llamar. 

console.log("Verificamos un tel: " + patronTelefono.test(telefonoFalso));

//2) Restringiendo Parametros: 
//Vemos que pasa cuando queremos trabajar con rutas y esperamos parametros del usuario. 

import express from "express";
const app = express(); 
const PUERTO = 8080; 
import clientesRouter from "./routes/clientes.router.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas
app.use("/clientes", clientesRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//¿Que hacemos con las rutas que no coinciden con ningun endpoint?

// app.get("*", (req, res) => {
//     res.status(404).send("Recurso no encontrado");
// })

//Nos conectamos con nuestro nuevo router utilizando el middleware del router habitual, solo que tenemos que instanciarlo antes:

import UserRouter from "./routes/user.router.js";
const userRouter = new UserRouter(); 
app.use("/users", userRouter.getRouter());