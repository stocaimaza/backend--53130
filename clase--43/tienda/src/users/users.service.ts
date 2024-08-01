import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//1) Vamos a importar el Decorador @InjectModel: 
import { InjectModel } from '@nestjs/mongoose';
//Importamos el User y el userSchema
import { User, userSchema, UsersDocument } from './schema/users.schema';
//Importamos Model de Mongoose: 
import { Model } from 'mongoose';


@Injectable()
export class UsersService {

  //2) Creamos el constructor: hacemos la inyeccion del nombre del modelo del usuario. 

  constructor(@InjectModel(User.name) private userModel: Model <UsersDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
