import winston from "winston";

//Pueden traer del configObject: node_env
// const { node_env } = configObject; 

const niveles = {
    fatal: 0, 
    error: 1, 
    warning: 2,
    info: 3, 
    http: 4, 
    debug: 5
}

//Logger para desarrollo: 

const loggerDesarrollo = winston.createLogger({
    levels: niveles, 
    transports: [
        new winston.transports.Console({
            level: "debug"
        })
    ]
})

//Logger para produccion: 

const loggerProduccion = winston.createLogger({
    levels: niveles, 
    transports: [
        new winston.transports.File({
            filename: "./errors.log", 
            level: "error"
        })
    ]
})


//Determinar que logger usar de acuerdo a la variable de entorno (.env). 
//Pueden usar un ternario: 

const logger = node_env === "produccion" ? loggerProduccion : loggerDesarrollo; 

//Middleware

const addLogger = (req, res, next) => {
    req.logger = logger; 
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}

//Exportar el middleware
export default addLogger;