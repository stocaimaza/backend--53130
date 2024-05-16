//BCRYPT es una librería de hashing para contraseñas. 

//1) Instalamos: npm install bcrypt. 
//2) Importamos el módulo: 
import bcrypt from "bcrypt"; 

//Se crearan dos funciones: 
//a) createHash: aplicar el hash al password. 
//b) isValidPassword: comparar el password proporcionado por el usuario con el almacenado en la base de datos. 

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//hashSync: toma el password que le pasamos y aplica el proceso de hasheo a partir de un salt. 

//Un "salt" es un string random que hace que el proceso de hasheo se realice de forma impredecible. 

//ESTE PROCESO ES IRREVERSIBLE! VAMOS A MORIR. 

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);