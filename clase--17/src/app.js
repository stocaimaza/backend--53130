/** MONGO AVANZADO 2 **/

//Temas: 

//1) Agregaciones
//2) Paginacion

////////////////////////////////////////////////////////////////////////////

// import mongoose from "mongoose";
// import OrderModel from "./models/order.model.js";


// const main = async () => {
//     await mongoose.connect("mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/Pizzeria?retryWrites=true&w=majority&appName=Cluster0")

//     Ejercicio 1: Nos piden que calculemos el total de las pizzas vendidas por sabor pero solo en tamaño familiar. 

//     const resultado = await OrderModel.aggregate([
//         {
//             $match: {
//                 tam: "familiar"
//             }
//         },
//         {
//             $group: {
//                 _id: "$nombre", 
//                 total: {
//                     $sum: "$cantidad"
//                 }
//             }
//         },
//         Ejercicio 2: Nos piden más datos y que los guardemos en una nueva colección. 
//         {
//             $sort: {
//                 total: -1
//                 -1 : Descendente
//                 1: Ascendente
//             }

//         },
//         {
//             $group: {
//                 _id: 1, 
//                 orders: {
//                     $push: "$$ROOT"
//                     Push indica que se guardan los resultados en un array y $$ROOT hace referencia al documento actual. 
//                 }
//             }
//         },
//         {
//             $project: {
//                 _id: 1, 
//                 orders: "$orders"
//                 Acá le decimos que el campo orders, va a ser igual a los resultados que guardamos en el paso anterior. 
//             }
//         },
//         Ultimo paso super importante, hacemos el merge de los resultados en una nueva colección. 
//         {
//             $merge: {
//                 into: "reportes"
//             }
//         }
//     ])


//     console.log(resultado);

// }

// main();


//2) Paginacion: 
//La paginacion es un proceso que consiste en dividir los resultados de una consulta en bloques de datos. 

//Instalamos la dependencia: npm i mongoose-paginate-v2

//Ejemplo con express: 

import express from "express";
const app = express(); 
const PUERTO = 8080;
import exphbs from "express-handlebars";
import OrderModel from "./models/order.model.js";
import "./database.js";

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/pizzas", async (req, res) => {
    const page = req.query.page || 1; 
    let limit = 1;

    try {
        const pizzas = await OrderModel.paginate({}, {limit, page});
        
        
        //Forma rustica de arreglarlo (sin el lean())

        const pizzasResultadoFinal = pizzas.docs.map(pizza => {
            const {_id, ...rest} = pizza.toObject();
            return rest;
        })


        res.render("pizzas", {
            pizzas: pizzasResultadoFinal,
            hasPrevPage: pizzas.hasPrevPage,
            hasNextPage: pizzas.hasNextPage,
            prevPage: pizzas.prevPage,
            nextPage: pizzas.nextPage,
            currentPage: pizzas.page,
            totalPages: pizzas.totalPages
        });
        
    } catch (error) {
        res.status(500).send("Todo marcha, volve a intentar");
    }
})

app.listen(PUERTO, () => {
    console.log("Escuchando desde el puerto de Mar del Plata");
})