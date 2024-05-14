//4) Creando un Custom Router: 

import express from "express";
const router = express.Router(); 

class Router {
    constructor() {
        this.router = router; 
        this.init(); 
    }

    getRouter() {
        return this.router; 
        //Devuelve el objeto router. 
    }

    get(path, ...callbacks) {
        //Definir una ruta get en el router. 
        //El primer argumento es la ruta. 
        //Los siguientes son los callbacks que se ejecutaran cuando haga get en esta ruta determinada. 
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        //Acá aplicamos todos los callbacks que puede llegar a recibir la ruta. 
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                params[1].status(500).send(error);
            }
        })
    }

    //Custom Responses: 
    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload});
        res.sendServerError = error => res.status(500).send({status: "error", error}); 
        res.sendUserError = error => res.status(400).send({status: "error", error});
        next(); 
    }
}

export default Router; 