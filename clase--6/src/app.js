/** CLASE 6 - SERVIDORES WEB **/

//Temas de hoy: 

//1) ¿Qué es un servidor?
//2) Protocolo HTTP. 
//3) Módulo nativo HTTP. 
//4) Express JS. 
//5) Objeto Request
//6) Desafio n° 3. 

/////////////////////////////////////////////////////

//1) ¿Qué es un servidor?
//Software o hardware que almacena y administra recursos. Estos recursos pueden ser imagenes, archivos, sitios web, videos, datos, jueguitos. Su funcion es responder a las peticiones de los clientes. Aclaramos: el servidor puede responder a multiples clientes al mismo tiempo. A esta relación se la conoce como modelo cliente-servidor. 

//cliente = request
//servidor = response

//¿Bajo que protocolo se comunican el cliente y el servidor? 

//HTTP: significa "Hypertext Transfer Protocol" o "Protocolo de transferencia de hipertexto". Es un protocolo de comunicación, es decir, un conjunto de reglas que definen como se comunican dos dispositivos. 

//No se olviden de instalar nodemon como dependencia de desarrollo (npm i nodemon -D)

//2)Modulo Nativo HTTP

//Primer pasito: importar el módulo nativo HTTP

//const http = require("http");

//Segundo paso: vamos a crear el servidor web. Para esto vamos a usar un método que se llama createServer(). Este método recibe por parametro una función callback que va a ser ejecutada cada vez que se realice una peticion al servidor. Esta función recibe dos parametros: request y response. 

// const server = http.createServer( (request, response) => {
//     console.log("Se realizo una peticion al servidor!");
//     response.end("Mi primer hola mundo desde backend"); 
// })

//Tercer paso: vamos a poner a escuchar a nuestro servidor en un puerto de la compu. 


// server.listen(PUERTO, () => {
//     console.log(`Escuchando en el http://localhost:${PUERTO}`);
// })



//4) Express JS: es un framework minimalista de Node js que nos permite crear servidores de una forma mucho más sencilla. 

//Instalacion: npm install express
    
//Importamos el módulo: 
const PUERTO = 8080; 
const express = require("express");

//Creación de una app de express
const app = express();

//Rutas

app.get("/", (req, res) => {    
    //Cuanto utilizo "/" estoy haciendo referencia a la ruta raíz de mi aplicación. La principal. 
    res.send("Mi primera chamba con Express JS");
})

//Los métodos HTTP o verbos son los que nos permiten indicarle al servidor que tipo de acción queremos realizar. Los mas utilizados: 

//GET: lo usamos para pedir datos al servidor. 
//POST: lo usamos para enviar datos al servidor. 
//PUT: lo usamos para actualizar datos del servidor. 
//DELETE: lo usamos para eliminar datos del servidor.  

// son los que conforman el CRUD
// get      = C/create
// post    = R/read
// put      = U/update
// delete = D/delete

app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})


//Practicamos con otras rutas: (endpoints)

app.get("/tienda", (req, res) => {
    res.send("Bienvenido a la tienda");
})

app.get("/contacto", (req, res) => {
    res.send("Bienvenidos a Contacto");
})

//5) Objeto request: es un objeto que representa la petición que realiza el cliente al servidor. Este objeto tiene información sobre la petición que se realizó, por ejemplo la url, el metodo, los parametros, el cuerpo.. 


//Array de productos Marolio: 

const misProductos = [
    {id:1, nombre: "Fideos", precio: 150},
    {id:2, nombre: "Arroz", precio: 250},
    {id:3, nombre: "Pan", precio: 350},
    {id:4, nombre: "Leche", precio: 450},
    {id:5, nombre: "Queso", precio: 550},
    {id:6, nombre: "Manteca", precio: 650},
    {id:7, nombre: "Galletitas", precio: 750},
]

//Vamos a crear una ruta nueva, que se va a llamar "productos" y nos retornará todos los productos del array: 

app.get("/productos", (req, res) => {
    res.send(misProductos);
})

//req.params = contiene los parametros de la ruta. Por ejemplo si tenemos la ruta /productos/:id, podemos acceder a ese id de la siguiente manera: req.params.id

app.get("/productos/:id", (req, res) => {
    let id = parseInt(req.params.id); 
    //Siempre que recuperan un dato de los params es un "String"!!!
    //Para solucionar lo pueden parseInt. 

    const producto = misProductos.find( producto => producto.id === id);

    if(producto) {
        res.send(producto);
    } else {
        res.send("Producto no encontrado, vamos a morir");
    }

})

//req.query = se refiere a las multiples consultas que se pueden hacer en determinada ruta (endpoint). Simplemente le tenemos que colocar el simbolo de interrogacion (?) y luego el nombre de la consulta. 


app.get("/clientes", (req, res) => {
    // let nombre = req.query.nombre;
    // let apellido = req.query.apellido; 

    //Tambien lo pueden hacer asi: 

    let {nombre, apellido} = req.query;

    res.send(`Bienvenido ${nombre} ${apellido}`);
})

//Ejemplo rustico: como retornar determinada cantidad de productos de un array: 

app.get("/product", (req, res) => {
    let limit = parseInt(req.query.limit);
    console.log(typeof limit);

    let productos = misProductos.slice(0, limit);
    res.send(productos);
})