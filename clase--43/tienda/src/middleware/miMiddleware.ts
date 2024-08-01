//Debemos importar nestMiddleware
import { NestMiddleware } from "@nestjs/common";

//Vamos a usar herramientas de "Express"
import { Request, Response, NextFunction } from "express";

export default class MiMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${req.method} a la ruta ${req.url}`); 
        next(); 
    }
}

//NestMiddleware es una interfaz proporcionada por NestJS en el paquete common que se utiliza para crear Middlewares pesonalizados. Esta interfaz define el metodo use que debe ser implementado por cualquier clase que actue como middleware en nestjs. 