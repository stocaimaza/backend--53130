// const mongoose = require("mongoose"); 
// const configObject = require("./config/config.js");

// mongoose.connect(configObject.mongo_url)
//     .then(() => console.log("Conectados a la BD"))
//     .catch( (error) => console.log("Tenemos un error: ", error))

//PATRON DE DISEÑO SINGLETON: 

//Lo usamos para tener una instancia global de toda la aplicación. El caso más usado es la conecxion con la base datos. 
//Este patron verifica si ya existe una instancia, caso contraria la crea. 

const mongoose = require("mongoose"); 
const configObject = require("./config/config.js");

class BaseDatos {
    static #instancia; 
    //Se declara una variable estatica y privada llamada "instancia". 
    constructor(){
        mongoose.connect(configObject.mongo_url);
    }

    static getInstancia() {
        if(this.#instancia) {
            console.log("Conexion previa");
            return this.#instancia;
        }

        this.#instancia = new BaseDatos(); 
        console.log("Conexion exitosa");
        return this.#instancia;
    }
}

//module.exports = BaseDatos; 

//Tambien puedo exportar para que se conecte automaticamente. 
module.exports = BaseDatos.getInstancia();

