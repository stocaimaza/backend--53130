/** CLASE 18 - COOKIES Y SESSION **/

//Las cookies son pequeños archivos de texto que viven en el navegador del usuario. 
//Esta información puede viajar entre las peticiones del cliente al servidor. 

//¿Que datos podemos guardar?
//a) Id de las sesiones. 
//b) Preferencias del usuario. 
//c) Nombres de usuario. 

//Caracteristicas: 

//. Se le puede configurar un tiempo de vida. 
//. Este archivito se almacena del lado del cliente, en el navegador, por lo tanto el espacio es limitado. 
//. Podemos darle un poco de seguridad con claves. 
//. Cuidado! Igual no tenemos que almacenar datos sensibles. 


//Sessions: 
//Esto nos permite conseguir un almacenamiento de información del cliente pero ahora en el servidor. Lo podemos trabajar desde el objeto request (req.session). 

//Caracteristicas: 

//. La información que se quiere guardar se almacena del lado del servidor. 
//. Del lado del cliente se crea un identificador único para poder acceder a esa información. 
//. Los datos almacenados en session se borran al cerrar el navegador. 
//. Se utiliza principalmente para guardar los datos de usuario al iniciar sesión. 

//instalamos: npm i express-session

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express(); 
const PUERTO = 8080;

//Vamos a instalar una dependencia que nos permite gestionar Cookies: npm i cookie-parser.

const miAltaClaveSecreta = "TinkiWinki";

//Middleware
app.use(cookieParser(miAltaClaveSecreta));
app.use(session({
    secret: "secretCoder",
    resave: true, 
    //Esta configuracion me permite mantener activa la sesión frente a la inactividad del usuario. 
    saveUninitialized: true, 
    //Me permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada para contener.
}))

//Middleware de autenticación: 

function auth(req, res, next) {
    if(req.session.user === "tinki" && req.session.admin === true) {
        return next(); 
    }
    return res.status(403).send("Error de autorización. ");
}



app.get("/", (req, res) => {
    res.send("Olis!")
})

//Setear Cookies: 

app.get("/setcookie", (req, res) => {
    //Usamos el objeto "res" para asignarle la cookie al usuario/cliente. 
    //res.cookie("coderCookie", "Mi Primera Chamba con Cookies").send("Cookie seteada!");
    //Las guardamos en clave y valor. 
    //Esta cookie vive hasta que es eliminada. Si yo quiero que tenga un tiempo de vida limitado puedo hacer lo siguiente: 
    res.cookie("coderCookie", "Mi Primera Chamba con Cookies", {maxAge:10000000}).send("Cookie seteada!");

})

//Leeemos el valor de una cookie: 

app.get("/leercookie", (req, res) => {
    res.send(req.cookies);
})

//Borramos una cookie: 

app.get("/borrarcookie", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie Eliminada!");
})

//Enviar una cookie firmada: 

app.get("/cookiefirmada", (req, res) => {
    res.cookie("cookieFirmada", "Esto es un mensaje secreto", {signed: true}).send("Cookie firmada enviada!");
})

//Obtenemos una cookie firmada

app.get("/recuperamoscookiefirmada", (req, res) => {
    //Ahora para recuperar la cookie firmada tengo que utilizar: req.signedCookies

    const valorCookie = req.signedCookies.cookieFirmada; 

    if (valorCookie) {
        res.send("Cookie recuperada con exito!: " + valorCookie);
    } else {
        res.send("Cookie Invalida!");
    }

})

//Levantando la session en el endpoint: 

app.get("/session", (req, res) => {
    //Si al conectarme la sesión ya existe aumento un contador. 
    if(req.session.counter) {
        req.session.counter++; 
        res.send("Visitaste el sitio: " + req.session.counter + " veces");
    } else {
        req.session.counter = 1; 
        res.send("Bienvenido! Unite al club de Session!");
    }
})

//Eliminamos datos de la sesion: 

app.get("/logout", (req, res) => {
    //Para eliminar datos de una variable de sesion, se utiliza el objeto de req y el método destroy. Lo pasamos en un callback: 
    req.session.destroy( (error) => {
        if (!error) {
            res.send("Sesión Cerrada!");
        } else {
            res.send("Error al cerrar la sesión, vamos a morir, si esto no sale dedicate a corte y confección. ");
        }
    })
})

//Login con Session: 

app.get("/login", (req, res) => {
    let {usuario, pass} = req.query; 

    if ( usuario === "tinki" && pass === "winki" ) {
        req.session.user = usuario; 
        req.session.admin = true; 
        res.send("Inicion de sesión exitosa! Viva la programación!"); 
    } else {
        res.send(" Datos incorrectos, vete ladron malvado de mi vida! ");
    }
})

// Ruta privada con Login: 

app.get("/privado", auth, (req, res) => {
    res.send("Si llegas hasta acá es porque estas logueado y sos admin!!!");
})

app.listen(PUERTO, () => {
    console.log(`Escuchando desde el Puerto de Mar del Plata`);
});