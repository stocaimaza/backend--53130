const UserModel = require("../models/user.model.js");
const CartModel = require("../models/cart.model.js");
const jwt = require("jsonwebtoken");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");
const UserDTO = require("../dto/user.dto.js");
const { generarResetToken } = require("../utils/tokenreset.js");

//Tercer integradora:
const EmailManager = require("../services/email.js");
const emailManager = new EmailManager();


class UserController {
    async register(req, res) {
        const { first_name, last_name, email, password, age } = req.body;
        try {
            const existeUsuario = await UserModel.findOne({ email });
            if (existeUsuario) {
                return res.status(400).send("El usuario ya existe");
            }

            //Creo un nuevo carrito: 
            const nuevoCarrito = new CartModel();
            await nuevoCarrito.save();

            const nuevoUsuario = new UserModel({
                first_name,
                last_name,
                email,
                cart: nuevoCarrito._id,
                password: createHash(password),
                age
            });

            await nuevoUsuario.save();

            const token = jwt.sign({ user: nuevoUsuario }, "coderhouse", {
                expiresIn: "1h"
            });

            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true
            });

            res.redirect("/api/users/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const usuarioEncontrado = await UserModel.findOne({ email });

            if (!usuarioEncontrado) {
                return res.status(401).send("Usuario no válido");
            }

            const esValido = isValidPassword(password, usuarioEncontrado);
            if (!esValido) {
                return res.status(401).send("Contraseña incorrecta");
            }

            const token = jwt.sign({ user: usuarioEncontrado }, "coderhouse", {
                expiresIn: "1h"
            });

            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true
            });

            res.redirect("/api/users/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }

    async profile(req, res) {
        //Con DTO: 
        const userDto = new UserDTO(req.user.first_name, req.user.last_name, req.user.role);
        const isAdmin = req.user.role === 'admin';
        res.render("profile", { user: userDto, isAdmin });
    }

    async logout(req, res) {
        res.clearCookie("coderCookieToken");
        res.redirect("/login");
    }

    async admin(req, res) {
        if (req.user.user.role !== "admin") {
            return res.status(403).send("Acceso denegado");
        }
        res.render("admin");
    }

    //Tercer Integradora: 

    async requestPasswordReset(req, res) {
        const { email } = req.body;
        try {
            //Buscar al usuario por email
            const user = await UserModel.findOne({ email });

            if (!user) {
                //Si no hay usuario tiro error y el metodo termina aca. 
                return res.status(404).send("Usuario no encontrado");
            }

            //Peeero, si hay usuario, le genero un token: 

            const token = generarResetToken();
            //Recuerden que esto esta en la carpetita utils. 

            //Una vez que tenemos el token se lo podemos agregar al usuario: 

            user.resetToken = {
                token: token,
                expire: new Date(Date.now() + 3600000) // 1 Hora de duración. 
            }

            await user.save();

            //Despues que guardamos los cambios, mandamos el mail: 
            await emailManager.enviarCorreoRestablecimiento(email, user.first_name, token);

            res.redirect("/confirmacion-envio");
        } catch (error) {
            res.status(500).send("Error interno del servidor");
        }
    }

    async resetPassword(req, res) {
        const { email, password, token } = req.body;

        try {
            //Busco el usuario: 
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.render("passwordcambio", { error: "Usuario no encontrado" });
            }

            //Saco token y lo verificamos: 
            const resetToken = user.resetToken;
            if (!resetToken || resetToken.token !== token) {
                return res.render("passwordreset", { error: "El token es invalido" });
            }

            //Verificamos si el token expiro: 
            const ahora = new Date();
            if (ahora > resetToken.expire) {
                return res.render("passwordreset", { error: "El token es invalido" });
            }

            //Verificamos que la contraseña nueva no sea igual a la anterior: 
            if (isValidPassword(password, user)) {
                return res.render("passwordcambio", { error: "La nueva contraseña no puede ser igual a la anterior" });
            }

            //Actualizo la contraseña: 
            user.password = createHash(password);

            //Marcamos como usado el token: 
            user.resetToken = undefined;
            await user.save();

            return res.redirect("/login");

        } catch (error) {
            res.status(500).render("passwordreset", { error: "Error interno del servidor" });
        }
    }

    //Cambiar el rol del usuario: 

    async cambiarRolPremium(req, res) {
        const {uid} = req.params; 
        try {
            //Busco el usuario: 
            const user = await UserModel.findById(uid); 

            if(!user) {
                return res.status(404).send("Usuario no encontrado"); 
            }

            //Peeeeero si lo encuentro, le cambio el rol: 

            const nuevoRol = user.role === "usuario" ? "premium" : "usuario"; 

            const actualizado = await UserModel.findByIdAndUpdate(uid, {role: nuevoRol});
            res.json(actualizado); 
        } catch (error) {
            res.status(500).send("Error en el servidor, a Fede le baja la temperatura a -4 grados ahora en verano"); 
        }
    }


}

module.exports = UserController;
