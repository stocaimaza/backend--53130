import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new mongoose.Schema({
    nombre: String,
    tam: String,
    precio: Number, 
    cantidad: Number
})

//Unico cambio que tenemos que aplicar para que la paginacion funcione es agregarle el plugin:
schema.plugin(mongoosePaginate);

const OrderModel = mongoose.model("pizzas", schema);

export default OrderModel;