/** CLASE 30 - MAILING Y MENSAJERIA  **/

//Temas de hoy: 

//1) Protocolo SMTP. 
//2) Nodemailer. 
//3) Twilio. 

//Instalamos nodemon y express. 

//SMTP: (Simple Mail Tranfer Protocol) o en espanish Protocolo de Transferencia de mail simple, es el protocolo que nuestras aplicaciones utilizan siempre que se tiene que enviar un correo electronico. 

//Nodemailer: es una libreria que nos permite realizar el envio de mensajeria desde nuestras aplicaciones. 
//Recuerden que Nodemailer trabaja como un puente entre nuestra aplicacion y los servicios de web mail tradicional. 

import express from "express";
import nodemailer from "nodemailer";
import exphbs from "express-handlebars";
const app = express();
const PUERTO = 8080;


//Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Express-Handlebars: 
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas 

app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Coder Test <coderhouse53130@gmail.com>",
            to: "stocaimaza@hotmail.com",
            subject: "Correo de Prueba",
            html: `<h1> Hola, te secuestramos el Visual </h1>
                    <img src="cid:patito1">`,
            //Para enviar una imagen como adjunto: 
            attachments: [{
                filename: "patito.webp",
                path: "./src/public/img/patito.webp",
                cid: "patito1"
            }]
        })



        res.send("Correo enviado correctamente");
    } catch (error) {
        res.status(500).send("Error al enviar un email, nos vamos a morir");
    }
})

//Mostramos la vista contacto: 
app.get("/contacto", (req, res) => {
    res.render("contacto");
})

app.post("/enviarmensaje", async (req, res) => {
    const { email, mensaje } = req.body;
    try {
        await transport.sendMail({
            from: "Coder Mail <coderhouse53130@gmail.com>",
            to: email,
            subject: "TEST",
            text: mensaje
        })
        res.send("Correo enviado! Todo nos sale bien");
    } catch (error) {
        res.status(500).send("Todo mal, a llorar al campito");
    }
})



app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//1) Instalamos: npm i nodemailer
//2) Importamos el modulo: import nodemailer from "nodemailer"
//3) Vamos a crear un objeto especial llamado "transporte". Acá voy a configurar el servicio SMTP que vamos a utilizar. 

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "coderhouse53130@gmail.com",
        pass: "tu clave"
    }
})


//TWILIO: servicio que nos permite enviar SMS, WhatsApp, chatbots, mensajes pregrabados. 

const TWILIO_ACCOUNT_SID = "aa";
const TWILIO_AUTH_TOKEN = "bb";
const TWILIO_SMS_NUMBER = "cc";


//Instalamos: npm i twilio.

//Importamos: 
import twilio from "twilio";

//Configuramos el Cliente: 
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER);

//Creamos una ruta para enviar un sms: 
app.get("/sms", async (req, res) => {
    try {
        await client.messages.create({
            body: "Su auto ya esta limpio, lo puede venir a retirar ",
            from: TWILIO_SMS_NUMBER,
            to: "+542236693878"
        })
        res.send("Enviado el SMS!");
    } catch (error) {
        res.status(500).send("Error al enviar el SMS");
    }
})
