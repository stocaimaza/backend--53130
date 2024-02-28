/** AFTER 1 - PRIMER DESAFIO DE LA COMISION **/

class ProductManager {
    //Variable estática: 
    static ultId = 0;
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, img, code, stock){

        //Hacemos las validaciones: 
        //1) Validamos que todos los campos se agregaron: 
        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Che, todos los campos son obligatorios, no seas asi!");
            return;
        }

        //2) Validamos que el código sea único: 
        if(this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico, rata de dos patas!");
            return; 
        }

        //Creamos un objeto con todos estos datos: 

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price, 
            img,
            code,
            stock
        }

        //Lo agrego al array: 

        this.products.push(newProduct);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Producto no encontrado, moriras!!!!!");
        } else {
            console.log("Siiii, lo encontramos!! ", product);
        }
    }
}

//Testing: 

//1) Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager(); 

//2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(manager.getProducts());

//3) Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

manager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

//4)Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

manager.addProduct("fideos", "los mas ricos", 200, "sin imagen", "abc124", 50);

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

manager.addProduct("arroz", "el que no se pasa", 300, "sin imagen", "abc125", 150);

console.log(manager.getProducts());

//5)Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

manager.getProductById(2);
manager.getProductById(2000);


