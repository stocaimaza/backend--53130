import dotenv from "dotenv";
import program from "../utils/commander.js"; 

const { mode } = program.opts(); 

dotenv.config({
    path: mode ==="produccion" ? "./.env.produccion" : "./.env.desarrollo"
});

const configObject = {
    mongo_url: process.env.MONGO_URL
};

export default configObject;