import express from "express";
const router = express.Router(); 
import UsuarioModel from "../models/usuario.model.js";
import { isValidPassword } from "../utils/hashbcrypt.js";

//Login: 
router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const usuario = await UsuarioModel.findOne({email:email});
        if( usuario ) {
            //Si encuentro el usuario, validamos el password: 
            //if(usuario.password === password) {

            //Ahora con BCRYPT: 
            if(isValidPassword(password, usuario)) {    
                req.session.login = true; 
                req.session.user = {
                    email: usuario.email, 
                    first_name: usuario.first_name
                }
                res.redirect("/profile");
            } else {
                res.status(401).send("Contraseña no valida");
            }
        } else {
            res.status(404).send("Usuario no encontrado");
        }
        
    } catch (error) {
        res.status(400).send("Error en el Login");
    }
})

//Logout: 

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})



export default router; 