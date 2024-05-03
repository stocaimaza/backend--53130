const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { createHash } = require("../utils/hashbcryp.js");

//Post para generar un usuario y almacenarlo en MongoDB:

router.post("/", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        // Verificar si el correo electrónico ya está registrado
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ error: "El correo electrónico ya está registrado" });
        }

        // Definir el rol del usuario
        const role = email === 'admincoder@coder.com' ? 'admin' : 'usuario';

        // Crear un nuevo usuario
        const newUser = await UserModel.create({ first_name, last_name, email, password: createHash(password), age, role });

        // Almacenar información del usuario en la sesión (puedes ajustarlo según tus necesidades)
        req.session.login = true;
        req.session.user = { ...newUser._doc };

        //res.status(200).send({ message: "Usuario creado con éxito" });
        res.redirect("/products");

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});




module.exports = router;

