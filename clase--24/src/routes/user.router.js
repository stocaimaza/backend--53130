import express from "express";
const router = express.Router();
import UsuarioModel from "../models/usuarios.model.js";
import jwt from "jsonwebtoken"; 
import passport from "passport";

//Register: 

router.post("/register", async (req, res) => {
    const {usuario, password} = req.body; 

    try {
        //Verificamos si el usuario ya existe
        const existeUsuario = await UsuarioModel.findOne({usuario});

        if ( existeUsuario ) {
            return res.status(400).send("El usuario ya existe, moriraaas");
        }

        //Si el usuario no existe, lo voy a crear: 

        const nuevoUsuario = new UsuarioModel({
            usuario,
            password
        });

        await nuevoUsuario.save();
        //Lo guardamos en la Base de Datos.

        //Generamos el token: 
        const token = jwt.sign({usuario: nuevoUsuario.usuario}, "coderhouse", {expiresIn: "1h"});

        //Establecer el token como Cookie: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 hora de vida
            httpOnly: true //La cookie solo se puede acceder mediante HTTP
        }); 

        res.redirect("/home");
        
    } catch (error) {
        res.status(500).send("Error interno del servidor, 7 dias de mala suerte");
    }

})

//Login: 

router.post("/login", async (req, res) => {
    const {usuario, password} = req.body; 

    try {
        //1) Verificamos que el usuario ingresdo existe en nuestra Base de Datos: 
        const usuarioEncontrado = await UsuarioModel.findOne({usuario:usuario});
        

        if ( !usuarioEncontrado ) {
            return res.status(401).send("Usuario no encontrado");
        }

        //2) Verificamos la contraseña: 

        if (password !== usuarioEncontrado.password) {
            return res.status(401).send("Contraseña incorrecta, vete hacker!"); 
        }

        //Generamos el token: 
        const token = jwt.sign({usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol}, "coderhouse", {expiresIn: "1h"});

        //Establecer el token como Cookie: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 hora de vida
            httpOnly: true //La cookie solo se puede acceder mediante HTTP
        }); 

        res.redirect("/home"); 
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

//Home: 

router.get("/home", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.render("home", {usuario: req.user.usuario});
})

//Logout: 

router.post("/logout", (req, res) => {
    //Voy a limpiar la cookie del Token
    res.clearCookie("coderCookieToken"); 
    //Redirigir a la pagina del Login. 
    res.redirect("/login");
})

//Ruta Admin: 

router.get("/admin", passport.authenticate("jwt", {session: false}), (req, res) => {
    console.log(req.user);
    if ( req.user.rol !== "admin") {
        return res.status(403).send("Acceso Denegado");
    }
    //Si el usuario es admin, mostrar el panel correspondiente: 
    res.render("admin");
})


export default router; 