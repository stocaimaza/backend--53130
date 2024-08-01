import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

//Importamos el MongooseModule y luego utilizamos el método forRoot para pasarle la URL de MongoDB Atlas. 
import { MongooseModule } from '@nestjs/mongoose';

//MiMiddleware: 
//1) Tenemos que importar NestModule, MiddlewareConsumer y tambien MiMiddleware. 
//2) Completamos el AppModule

import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import MiMiddleware from './middleware/miMiddleware';

//Manejo de entornos: 
import { ConfigModule, ConfigService } from '@nestjs/config';
//ConfigModule se utiliza en los imports
//ConfigService se injecta para usarse como servicio. 



@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService], 
    useFactory: async (config:ConfigService) => ({
      uri: config.get<string>("MONGO_URL")
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiMiddleware).forRoutes({path: "*", method: RequestMethod.ALL})
  }
}


//"mongodb+srv://swtocaimaza:coderhouse@cluster0.pmzgicx.mongodb.net/Nest?retryWrites=true&w=majority&appName=Cluster0"