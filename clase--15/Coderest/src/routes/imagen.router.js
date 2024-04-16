import {Router} from "express";
import ImagenModel from "../models/imagen.model.js";
import {promises as fs} from "fs";
const router = Router(); 

//Ruta a la raíz de la aplicación

router.get("/", async (req, res) => {
    const imagenes = await ImagenModel.find().lean();
    res.render("index", {imagenes});
})

//Ruta para acceder al formulario de carga de imagenes: 

router.get("/upload", (req, res) => {
    res.render("upload");
})

//Ruta upload para cargar imagenes: 

router.post("/upload",  async (req, res) => {
    try {
        const imagen = new ImagenModel(); 
        imagen.title = req.body.title;
        imagen.description = req.body.description;
        imagen.filename = req.file.filename;
        imagen.path = "/img/" + req.file.filename;

        //Guardamos la imagen en la base de datos
        await imagen.save(); 

        res.redirect("/");
    } catch (error) {
        res.status(500).send({message: "Error en el servidor, vamos a morir"});
    }
})

//Ruta para eliminar una imagen

router.get("/image/:id/delete", async (req, res) => {
    const {id} = req.params; 
    const imagen = await ImagenModel.findByIdAndDelete(id);
    await fs.unlink("./src/public" + imagen.path);
    res.redirect("/");
})


export default router; 