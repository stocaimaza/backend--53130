import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        //index:true
    },
    apellido: String, 
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    edad: {
        type: Number,
        index:true
    }
})

const UserModel = mongoose.model("usuarios", userSchema);

export default UserModel;