import express from "express";
const router = express.Router();
// import UsuarioModel from "../models/usuario.model.js";
// import { isValidPassword } from "../utils/hashbcrypt.js";
import passport from "passport";

//Login: 
// router.post("/login", async (req, res) => {
//     const {email, password} = req.body;

//     try {
//         const usuario = await UsuarioModel.findOne({email:email});
//         if( usuario ) {
//             //Si encuentro el usuario, validamos el password: 
//             //if(usuario.password === password) {

//             //Ahora con BCRYPT: 
//             if(isValidPassword(password, usuario)) {    
//                 req.session.login = true; 
//                 req.session.user = {
//                     email: usuario.email, 
//                     first_name: usuario.first_name
//                 }
//                 res.redirect("/profile");
//             } else {
//                 res.status(401).send("Contraseña no valida");
//             }
//         } else {
//             res.status(404).send("Usuario no encontrado");
//         }

//     } catch (error) {
//         res.status(400).send("Error en el Login");
//     }
// })

//Logout: 

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

//VERSION PARA PASSPORT: 

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin"
}), async (req, res) => {
    if (!req.user) {
        return res.status(400).send("Credenciales invalidas");
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };

    req.session.login = true;

    res.redirect("/profile");
})


router.get("/faillogin", async (req, res) => {
    res.send("Fallo todo, vamos a morir");
})

//VERSION PARA GITHUB: 

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), async (req, res) => {
    //La estrategia de Github nos retornará el usuario, entonces los agrego a mi objeto de Session: 
    req.session.user = req.user; 
    req.session.login = true; 
    res.redirect("/profile");
})


export default router; 