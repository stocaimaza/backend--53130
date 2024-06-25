import express from "express"; 
const app = express(); 

app.get("/", (req, res) => {
    res.send("Hola mamá, estoy usando Yarn y sin manos"); 
})

app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080");
})