import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
    dias: [],
    nombre: {
        type: String, 
        index: true
    },
    horario: String,
    numeroComision: String
})

const CursoModel = mongoose.model("cursos", cursoSchema);

export default CursoModel;