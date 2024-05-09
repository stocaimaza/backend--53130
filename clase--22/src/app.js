/** CLASE 22 -- PASSPORT AVANZADO  **/

import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import { authorization, passportCall } from "./utils/util.js";
const app = express();
const PUERTO = 8080;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

//Rutas

app.post("/login", (req, res) => {
    let { usuario, pass } = req.body;

    if (usuario === "tinki" && pass === "winki") {
        //Voy a crear el token: 
        //let token = jwt.sign({ usuario, pass }, "coderhouse", { expiresIn: "24h" });
        //res.send({message: "Login exitoso", token});

        ////////////////////////////////////////////////////////////
        //ENVIAR TOKEN DESDE UNA COOKIE: 
        //res.cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ message: "Login Exitoso! Todo biennn!" });

        ////////////////////////////////////////////////////////////
        //Modificación para utilizar el middleware "authorization": 
        let token = jwt.sign({ usuario, pass, role:"user"}, "coderhouse", { expiresIn: "24h" });
        res.cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ message: "Login Exitoso! Todo biennn!" });


    } else {
        res.send({ message: "Login fallido! " });
    }
})

//Creamos la ruta current: 

// app.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
//     res.send(req.user);
// })

//Ahora usamos el PassportCall: 

app.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
    res.send(req.user);
})

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})
