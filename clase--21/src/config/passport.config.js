//Instalamos: npm i passport passport-local

//Importamos los módulos: 
import passport from "passport";
import local from "passport-local";

//Estrategia con GitHub:
import GitHubStrategy from "passport-github2";

//Traemos el UsuarioModel y las funciones de bcryp: 
import UsuarioModel from "../models/usuario.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";


const LocalStrategy = local.Strategy;

const initializePassport = () => {
    //Vamos a armar nuestras estrategias: Registro y Login. 

    passport.use("register", new LocalStrategy({
        //Le digo que quiero acceder al objeto request
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
            //Verificamos si ya existe un registro con ese email: 
            let usuario = await UsuarioModel.findOne({ email });

            if (usuario) {
                return done(null, false);
            }

            //Si no existe voy a crear un registro de usuario nuevo: 

            let nuevoUsuario = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let resultado = await UsuarioModel.create(nuevoUsuario);
            return done(null, resultado);
            //Si todo resulta bien, podemos mandar done con el usuario generado. 
        } catch (error) {
            return done(error);
        }
    }))

    //Agregamos otra estrategia para el "Login".
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {

        try {
            //Primero verifico si existe un usuario con ese email: 
            let usuario = await UsuarioModel.findOne({ email });

            if (!usuario) {
                console.log("Este usuario no existeee ehhhh vamo a mori!");
                return done(null, false);
            }

            //Si existe verifico la contraseña: 
            if (!isValidPassword(password, usuario)) {
                return done(null, false);
            }

            return done(null, usuario);


        } catch (error) {
            return done(error);
        }
    }))

    //Serializar y deserializar: 

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UsuarioModel.findById({ _id: id });
        done(null, user);
    })

    //Acá generamos la nueva estrategia con GitHub: 

    passport.use("github", new GitHubStrategy({
        clientID: "Iv23liBxSEJXDVkLcfMe",
        clientSecret: "a79b8d979c8eee44f887eb0b7d6f329b17e4d791",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        //Veo los datos del perfil
        console.log("Profile:", profile);

        try {
            let usuario = await UsuarioModel.findOne({ email: profile._json.email });

            if (!usuario) {
                let nuevoUsuario = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 36,
                    email: profile._json.email,
                    password: "miau"
                }

                let resultado = await UsuarioModel.create(nuevoUsuario);
                done(null, resultado);
            } else {
                done(null, usuario);
            }
        } catch (error) {
            return done(error);
        }
    }))
}

export default initializePassport;