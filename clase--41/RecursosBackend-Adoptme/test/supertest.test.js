//Instalamos supertest: npm i supertest -D
//Actualizamos el script de test. 

//Importamos el modulo de supertest: 
import supertest from "supertest";

//Importamos chai, recuerden que es una libreria de aserciones para node js. 
import { expect } from "chai";

//Vamos a crear una constante que se va a llamar "requester", quien sera el encargado de hacer las peticiones al servidor. 

const requester = supertest("http://localhost:3000");

//Ahora vamos a trabajar con dos "describe". Uno hace referencia a la aplicacion "Adoptame" y el otro para cada entidad interna que vamos a ir testeando. 


describe("Testing de la Web App Adoptame", () => {
    describe("Testing de mascotas: ", () => {
        it("Endpoint POST /api/pets debe crear una mascota correctamente", async () => {
            //Voy a crear un mock de una mascota:

            const pichichoMock = {
                name: "Firulais", 
                specie: "Chucho", 
                birthDate: "2021-03-10"
            }

            const {statusCode, ok, _body} = await requester.post("/api/pets").send(pichichoMock); 
            //En cada prueba yo puedo recibir el ok, el statusCode, _body. 

            //Mostramos por consola:
            console.log(statusCode);
            console.log(ok);
            console.log(_body); 

            //Y ahora evaluamos: 
            expect(_body.payload).to.have.property("_id"); 

        })

        //Actividad en clase: 

        it("Al crear una mascota sólo con los datos elementales. Se debe corroborar que la mascota creada cuente con una propiedad adopted: false", async () => {

            const nuevaMascota = {
                name: "Rex", 
                specie: "Perro Maquina de guerra", 
                birthDate: "1990-01-01"
            }

            const {statusCode, body} = await requester.post("/api/pets").send(nuevaMascota); 

            expect(statusCode).to.equal(200); 
            expect(body.payload).to.have.property("adopted").that.equal(false); 
        })

        it("Si se desea crear una mascota sin el campo  nombre, el módulo debe responder con un status 400", async () => {
            const mascotaSinNombre = {
                specie: "Gato", 
                birthDate: "2020-05-15"
            }

            const { statusCode } = await requester.post("/api/pets").send(mascotaSinNombre); 

            expect(statusCode).to.equal(400); 
        })

        it("Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo", async () => {

            const { statusCode, body } = await requester.get("/api/pets");

            expect(statusCode).to.equal(200);
            //expect(body).to.have.property("payload").that.is.an("array");
            expect(body.payload).that.is.an("array");

        })

        it("El método PUT debe poder actualizar correctamente a una mascota determinada", async () => {
            const idMascotaExistente = "66a254cbb139738253796288";

            const datosActualizados = {
                name: "Perrito", 
                specie: "Perrito"
                //Pueden agregar cualquier campo que quisieran actualizar. 
            }

            const {statusCode} = await requester.put(`/api/pets/${idMascotaExistente}`).send(datosActualizados); 

            expect(statusCode).to.equal(200);

        })

        it("El método DELETE debe poder borrar la última mascota agregada", async () => {
            //Agregamos a la mascota: 
            const ultimaMascota = {
                name: "Jazmin", 
                specie: "Caniche", 
                birthDate: "1995-01-01"
            }

            const {body: {payload: { _id }}} = await requester.post("/api/pets").send(ultimaMascota); 

            //Con ese id borramos a la mascota deseada

            const {statusCode} = await requester.delete(`/api/pets/${_id}`); 

            //Verificamos: 

            expect(statusCode).to.equal(200);
        })
    })

     //TEST 2: Registro de usuarios

    describe("Test Avanzado", () => {
        //Declaramos de forma global una variable cookie que voy a usar en las siguientes pruebas: 
        let cookie; 

        it("Debe registrarse correctamente a un usuario", async () => {
            
            const mockUsuario = {
                first_name: "Pepe", 
                last_name: "Argento", 
                email: "pepe@zapateriagarmendia.com", 
                password: "1234"
            }

            const {body} = await requester.post("/api/sessions/register").send(mockUsuario);

            //Validamos que tengamos un payload: 
            expect(body.payload).to.be.ok;
        })

        it("Se debe loguear correctamente el usuario y recuperar la cookie", async () => {
            
            //Enviamos al login los mismos datos que registramos en el paso anterior. 

            const usuarioLogin = {
                email: "pepe@zapateriagarmendia.com", 
                password: "1234"
            }  

            const resultado = await requester.post("/api/sessions/login").send(usuarioLogin); 

            //Resultado es la respusta que me da "requester". Voy a buscar del resultado los headers de la peticion: 
            const cookieResultado = resultado.headers["set-cookie"][0]; 

            //podemos verificar que la cookie recuperada exista:
            expect(cookieResultado).to.be.ok; 

            //Separamos el nombre y el valor de la cookie recuperada y la guardamos en "cookie": 
            cookie = {
                name: cookieResultado.split("=")[0],
                value: cookieResultado.split("=")[1]
            }

            //Verificamos que los datos recuperados sean correctos: 

            expect(cookie.name).to.be.ok.and.equal("coderCookie"); 
            expect(cookie.value).to.be.ok; 

        })

        //Probamos la ruta current:
        it("Debe enviar al cookie que contiene el usuario", async () => {
            //Ingresamos a la ruta current enviando la cookie
            const { body } = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]); 

            //Verificamos: 
            expect(body.payload.email).to.be.eql("pepe@zapateriagarmendia.com");
        })
    })

    //TESTING DE CARGA DE IMAGENES: 

    describe("Testeamos la carga de imagenes", () => {
        it("Tenemos que crear una mascota con imagen", async () => {
            const mascotaMock = {
                name: "MichiFuz", 
                specie: "gatito", 
                birthDate: "2024-01-01"
            }

            //Ahora ya no usamos el metodo send, sino que usamos field, para los distintos campos: 

            const resultado = await requester.post("/api/pets/withimage")
                .field("name", mascotaMock.name)
                .field("specie", mascotaMock.specie)
                .field("birthDate", mascotaMock.birthDate)
                .attach("image", "./test/gatito.jpg"); 

            //Verificamos que la peticion resulto exitosa
            expect(resultado.status).to.be.equal(200); 

            //Verificamos que la mascota tenga un id: 
            expect(resultado._body.payload).to.have.property("_id"); 
        })
    })
})


