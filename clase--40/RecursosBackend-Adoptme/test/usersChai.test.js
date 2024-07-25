//Chai es una libreria de assertions, la cual nos permitira realizar comparaciones de test mas claras. 

//Instalamos como dependencia de desarrollo: npm install -D chai

import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
import {expect} from "chai";
//Con la ultima version de chai: 5.1.1 podes importar directamente "expect". 
//const expect = chai.expect;

//Me conecto a mi Base de datos:

mongoose.connect("mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0");

describe("Testeamos el DAO de Usuarios", function () {
    //Le asignamos un nombre o titulo
    //Pasamos una funcion callback que contiene todas las pruebas individuales. 

    //Esto se ejecuta una vez, antes de las pruebas. 
    before(function () {
        this.usersDao = new User();
    })

    /////////////////////////////////////////////////////////////////////////
    //Podemos limpiar la base de datos cada vez que testeamos. 
    beforeEach(async function () {
        await mongoose.connection.collections.users.drop();
    })

    /////////////////////////////////////////////////////////////////////////

    //En el "it" describimos lo que se espera del test
    it("El get de usuarios me retorne un array", async function () {
        const resultado = await this.usersDao.get();
        //assert.strictEqual(Array.isArray(resultado), true);

        //Con chai: 
        expect(Array.isArray(resultado)).to.be.true; 
    })

    //TEST 1: 
    it("El DAO debe poder agregar un usuario nuevo a la Base de Datos", async function () {
        let usuario = {
            first_name: "Mirtha",
            last_name: "Legrand",
            email: "lachiqui@legrand.com",
            password: 1234
        }

        const resultado = await this.usersDao.save(usuario);
        //assert.ok(resultado._id);
        //Aca verificamos que el valor que recibimos es "verdadero". 

        //With chai: 
        expect(resultado).to.have.property("_id"); 
    })

    //TEST 2: 
    it("Validamos que el usuario tenga un array de mascotas vacio", async function () {
        let usuario = {
            first_name: "Mirtha",
            last_name: "Legrand",
            email: "lachiqui@legrand.com",
            password: 1234
        }

        const resultado = await this.usersDao.save(usuario);
        //assert.deepStrictEqual(resultado.pets, []);

        //CONCHAI: 
        expect(resultado.pets).to.deep.equal([]);
    })

    //TEST 3: 
    it("El DAO puede obtener un usuario por email", async function () {
        let usuario = {
            first_name: "Mirtha",
            last_name: "Legrand",
            email: "lachiqui@legrand.com",
            password: 1234
        }

        await this.usersDao.save(usuario);

        const userBuscado = await this.usersDao.getBy({ email: usuario.email });

        //assert.strictEqual(typeof userBuscado, "object");
        //Con chai: 
        expect(userBuscado).to.be.an("object"); 
    })


    after(async function () {
        await mongoose.disconnect();
    })
})