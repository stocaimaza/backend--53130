import express from "express";
const router = express.Router(); 

//1) Importamos el modelo: 
import UsuariosModel from "../models/usuarios.model.js";

//Obtenemos el listado de todos los usuarios: 

router.get("/", async (req, res) => {
    try {
        const usuarios = await UsuariosModel.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json("Error en el servidor");
    }
})

//Subimos un nuevo usuario por postman

router.post("/", async (req, res) => {
    const usuarioNuevo = req.body;
    //Tomamos los datos del body de la petición. 
    try {
        const usuario = new UsuariosModel(usuarioNuevo);
        await usuario.save();
        res.send({message: "Usuario creado exitsoamente", usuario: usuario});
    } catch (error) {
        res.status(500).json("Error interno del servidor");
    }
})

//Actualizamos un usuario por ID

router.put("/:id",  async (req, res) => {
    const idBuscado = req.params.id; 
    const datosNuevos = req.body;

    try {
        const usuario = await UsuariosModel.findByIdAndUpdate(idBuscado, datosNuevos);
        res.status(200).send({message: "usuario actualizado", usuario: usuario});
        
    } catch (error) {
        res.status(500).json("Error interno del servidor");
    }
})


//Eliminamos un usuario por ID

router.delete("/:id", async (req, res) => {
    const idBuscado = req.params.id;
    try {
        const usuario = await UsuariosModel.findByIdAndDelete(idBuscado);
        if(!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.status(200).send("Usuario eliminado correctamente");
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

export default router; 