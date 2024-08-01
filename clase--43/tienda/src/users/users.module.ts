import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
//Necesitamos importar: 
import { User, userSchema } from './schema/users.schema';
//Nos traemos el MongooseModule: 
import { MongooseModule } from '@nestjs/mongoose';

//Importamos el "ConfigModule": 
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name, 
    schema: userSchema
  }]), ConfigModule], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
