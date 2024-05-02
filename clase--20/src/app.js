import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/user.router.js";
import sessionsRouter from "./routes/session.router.js";
import "./database.js";

const app = express(); 
const PUERTO = 8080; 

//Express-Handlebars: 

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"secretCoder",
    resave: true,
    saveUninitialized : true, 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))

//Rutas:

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);


app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})
