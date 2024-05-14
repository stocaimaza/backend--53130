import Router from "./router.js";

class UserRouter extends Router {
    init() {
        //Acá colocamos todas nuestras rutas: 
        this.get("/", (req, res) => {
            //res.send("Get de usuarios");
            //res.sendSuccess("Hola Alumnos, tenemos hambre, que llegue el almuerzo");
            res.sendServerError("error del servidor, vamos a morir, chat gpt3 cobro vida");

        })

        // this.post("/", (req, res) => {
        //     res.send("Post de usuarios");
        // })

        // this.put("/", (req, res) => {
        //     res.send("Put de usuarios");
        // })

    }
}

export default UserRouter;