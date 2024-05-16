/** SISTEMA DE LOGIN Y REGISTRO CON JSONWEBTOKEN  **/

//Instalamos: npm i bcrypt cookie-parser express express-handlebars jsonwebtoken mongoose passport passport-jwt

import express from "express";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
const app = express(); 
const PUERTO = 8080;
import "./database.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from "./routes/user.router.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas 
app.use("/", viewsRouter);
app.use("/", userRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

