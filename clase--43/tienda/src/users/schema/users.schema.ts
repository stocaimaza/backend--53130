import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

//Un documento hidratado hace referencia a que los resueltos devueltos por la base de datos sean retornados como Instancias de un documento de Mongo, lo cual significa que cuenta con funcionalidades adicionales de MongoDB. 

export type UsersDocument = HydratedDocument<User>


@Schema()
export class User {
    @Prop({required: true})
    first_name: string; 

    @Prop()
    last_name: string; 

    @Prop({required: true, unique: true})
    email: string; 

    @Prop()
    password: string;
}

export const userSchema = SchemaFactory.createForClass(User)