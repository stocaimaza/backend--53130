import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nombre: String,
    apellido: String, 
    legajo: Number
});

const UserModel = mongoose.model("usuarios", schema);

export default UserModel; 

