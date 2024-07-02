FROM node
#Definimos una imagen base de NODE. 

WORKDIR /app
#Acá estamos creando una carpeta interna donde guardar nuestro proyecto. 

COPY package.json .
#Aca copiamos el package.json a mi nueva carpeta de destino. 

RUN npm install
#Tiene que instalar todas las dependencias

COPY . .
#Copiamos todo el código de mi aplicación. 

EXPOSE 8080
#Que puerto vamos a escuchar

CMD [ "npm", "start" ]
#Tiene que ejecutar "npm start" para que funcione. 
