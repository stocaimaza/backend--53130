// import mongoose from "mongoose";
// import configObject from "./config/config.js";
// const { mongo_url } = configObject;

// mongoose.connect(mongo_url)
//     .then(() => console.log("Conectados a la BD"))
//     .catch((error) => console.log("No nos podemos conectar por este error: ", error))

///////////////////////////////////////////////////////////////////////////////

//Patron de diseño Singleton: 

//Es un patrón utilizado para tener una instancia global a nivel de aplicación. 

//Lo que hace: corrobora si ya existe una instancia de esta clase, si existe la retorna, sino la crea. 

import mongoose from "mongoose";
import configObject from "./config/config.js";
const { mongo_url } = configObject;

class BaseDatos {
    static #instancia; 
    //Se declara una variable estática y privada, significa que pertenece a la clase en si, y no a las instancias individuales de la misma. 
    constructor() {
        mongoose.connect(mongo_url);
    }

    static getInstancia(){
        if( this.#instancia) {
            console.log("Conexion previa");
            return this.#instancia; 
        }

        this.#instancia = new BaseDatos(); 
        console.log("Conexión generada"); 
        return this.#instancia;
    }
}

export default BaseDatos.getInstancia();