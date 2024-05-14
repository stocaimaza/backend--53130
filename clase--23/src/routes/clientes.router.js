import express from "express";
const router = express.Router();

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //En esta situación yo estoy esperando un parametro por URL, el nombre del cliente. 
    
    //¿Que ocurre si el cliente ingresa solo numeros o caracteres especiales en lugar de palabras?

    //Para solucionar este problema y recibir el dato deseado podemos usar expresiones regulares. 
    let cliente = req.params.cliente;
    res.send("Cliente: " + cliente);
})

//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.params.email; 

    if (patronCorreo.test(email)) {
        res.send("Email valido: " + email); 
    } else {
        res.send("Email invalido ");
    }
})

//3) Validando parametros: 
//Supongamos que al crecer mi app, voy a tener que generar muchas rutas que reciben el mismo parametro. 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parametro cliente. 
    res.send("Obteniendo recursos para el cliente: " + req.params.cliente);
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a enviar un recurso a partir del parametro cliente. 
    res.send("Enviando recursos para el cliente: " + req.params.cliente);
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a actualizar un recurso a partir del parametro cliente. 
    res.send("Actualizando recursos para el cliente: " + req.params.cliente);
})

router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a eliminar un recurso a partir del parametro cliente. 
    res.send("Eliminando recursos para el cliente: " + req.params.cliente);
})

//Nos encontramos que en los 4 métodos hay lineas de código que son iguales y se van a repetir: 

//a) Obtener el parametro del cliente. 
//b) Buscar el parametro en la base de datos. 
//c) Una vez validado, continuar con la operacion que corresponda. 

//Esto lo podemos simplificar a partir de un middleware llamado "router.param"


router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "lionel", "pepe"]; 

    if ( clientes.includes(cliente) ) {
        req.cliente = cliente; 
        next(); 
    } else {
        res.status(404).send("Recurso no encontrado");
    }
})

export default router; 