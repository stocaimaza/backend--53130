//Instalamos npm i dotenv
require("dotenv").config(); 
const config = {
    persistence: process.env.PERSISTENCE || "memory"
}

module.exports = config; 