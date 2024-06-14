const config = require("../config/config.js"); 

let DAO; 

switch(config.persistence) {
    case "mongo": 
        DAO = require("./mongoDBJugueteDAO.js");
        break; 
    case "memory":
        DAO = require("./memoryJugueteDAO.js");
        break; 
    case "file": 
        DAO = require("./fileSystemJugueteDAO.js"); 
        break; 
    default: 
        throw new Error ("Pusiste cualquier cosa"); 
}

module.exports = DAO;