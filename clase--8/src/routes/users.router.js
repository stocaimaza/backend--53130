import express from "express";
const router = express.Router();

//Array de users
const users = [];

//Ruta users: 

//Ruta para obtener todos los usuarios
router.get("/api/users", (req, res) => {
    res.send(users);
})

//Ruta para cargar usuarios nuevos

router.post("/api/users",  (req, res) => {
    const nuevoUsuario = req.body; 
    users.push(nuevoUsuario);
    res.send({message: "Usuario creado correctamente"});
})



export default router; 

