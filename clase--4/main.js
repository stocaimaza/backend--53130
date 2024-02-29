/** CLASE 4 - MANEJO DE ARCHIVOS **/

//Temas de hoy: 

//1) File System
//2) Manejo de archivos de forma sincrónica
//3) Manejo de archivos con callbacks
//4) Manejo de archivos con promesas
//5) Manejo de datos complejos
//6) Presentar el desafio n°2


//1) File System es un manejador de archivos que ya viene incorporado con Node JS. 
//Me permite realizar las operaciones de Crear, Leer, Actualizar y borrar registros (CRUD). 

//1) Paso: vamos a importar el módulo

const fs = require("fs");
//common js vs es modules


//console.log(fs);

//A) Trabajamos de forma sincrónica: 

const rutaSin = "./ejemplo-sin.txt";

//Crear un archivo: 

fs.writeFileSync(rutaSin, "Hola, estamos trabajando en un ejemplo sincronico");

//Leer un archivo

//let contenido = fs.readFileSync("./firulais.txt", "utf-8"); 
//Primer parametro el path, el segundo es el tipo de codificacion. 
//console.log(contenido);

//Podemos verificar primero que el archivo exista. 

if(fs.existsSync(rutaSin)) {
    let resultado = fs.readFileSync(rutaSin, "utf-8");
    console.log(resultado);
} else {
    console.log("No existe el archivo, vamos a morir todos!! ahhh");
}

//Actualizar contenidos: 

fs.writeFileSync(rutaSin, "Hola, actualizamos la info");
//Mi forma de actualizar es pisar el contenido.

//Agregamos mas contenido al final: 

fs.appendFileSync(rutaSin, " y este es un texto agregado al final");

//Eliminar un archivo: 

fs.unlinkSync(rutaSin);


//B) Trabajando con Callbacks

const conCall = "./ejemplo-con.txt";

fs.writeFile(conCall, "Nuevo archivo, ahora con callbacks", (error) => {
    //El tercer parámetro es el cb, que pregunta si hubo algun error. 
    if(error) return console.log("No pudimos crear el archivo");

    //Leemos el archivo: 
    fs.readFile("conCall", "utf-8", (error, contenido) => {
        if(error) return console.log("No podemos leer");
        console.log(contenido);
        //Acá el cb tiene 2 parametros, uno el error, segundo el contenido. 
        
        //Y si queremos agregar info? 
        fs.appendFile(conCall, " mas contenido", (error) => {
            if(error) return console.log("No podemos agregar mas contenido");
    
            fs.unlink(conCall, (error) => {
                if(error) return console.log("No podemos eliminarlo, vamos a perder el año");
            })
        })
    })
})

//C) Trabajando con Promesas: 

//Para poder trabajar con promesas, tenemos que usar la propiedad "promises" del módulo fs: 

const textoPromises = "./texto-pro.txt";

const operacionesAsincronicas = async () => {
    //Crear un archivo: 
    await fs.promises.writeFile(textoPromises, "Nuevo archivo!!");

    //Leer el archivo: 
    let respuesta = await fs.promises.readFile("./texto-pro.txt", "utf-8");
    console.log(respuesta);

    //Agregar contenido al final: 
    await fs.promises.appendFile("./texto-pro.txt", " agregamos este texto");

    //releer: 
    respuesta = await fs.promises.readFile("./texto-pro.txt", "utf-8");
    console.log(respuesta);

    //lo eliminamos: 
    await fs.promises.unlink("./texto-pro.txt");
}


operacionesAsincronicas();

//5) Manejo de datos complejos: 

//Desarrollamos un array de personas: 

const arrayPersonas = [
    {nombre: "Pepe", apellido: "Argento", edad: 50},
    {nombre: "Moni", apellido: "Argento", edad: 38},
    {nombre: "Paola", apellido: "Argento", edad: 17},
    {nombre: "Coky", apellido: "Argento", edad: 15},
    {nombre: "Fatiga", apellido: "Argento", edad: 9}
]

const archivoArgento = "./archivo-argento.json";

//De esta forma lo guardamos 

const guardarArchivos = async () => {
    await fs.promises.writeFile(archivoArgento, JSON.stringify(arrayPersonas, null, 2));
}

guardarArchivos();


//Lo recuperamos:

const leerArchivos = async () => {
    const respuesta = await fs.promises.readFile(archivoArgento, "utf-8");
    const nuevoArray = JSON.parse(respuesta);
    console.log(nuevoArray);
}

leerArchivos();




