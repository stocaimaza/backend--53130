//Importamos los modulos: 
import passport from "passport";
import jwt from "passport-jwt";
//Guarda! Acá traemos "passport-jwt" y no solo "jsonwebtoken". 

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",
        //Misma palabra que tenemos en la app. 
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error);
        }
    }))
}

//Creamos nuestro propio extractor de cookies: 
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["coderCookieToken"];
        //Si hay cookie, me guardo el token. 
    }
    return token;
}

export default initializePassport; 