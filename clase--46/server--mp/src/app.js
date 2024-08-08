//Instalamos previamente: npm i express cors mercadopago

import express from "express"; 
import cors from "cors"; 
const app = express(); 
const PUERTO = 8080; 

//MercadoPago: 
import {MercadoPagoConfig, Preference} from "mercadopago"; 
//Agregamos nuestras credenciales
const client = new MercadoPagoConfig({accessToken: "APP_USR-704508575711684-080810-d28b093735bfcc51de85fd2fc56afd80-1935671143"}); 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors()); 

app.get("/", (req, res) => {
    res.send("Olis, soy el server! Aguante MercadoPagooooo"); 
})

app.post("/create-preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title, 
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price), 
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://www.mercadolibre.com.ar",
                failure: "https://www.mercadolibre.com.ar", 
                pending: "https://www.mercadolibre.com.ar"
            }, 
            auto_return: "approved", 
        }; 

        const preference = new Preference(client); 
        const result = await preference.create({body}); 
        
        //Se lo enviamos al front: 
        res.json({
            id:result.id
        })
    } catch (error) {
        console.log(error); 
        res.send("error mortal, tragedia"); 
    }
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`); 
} )