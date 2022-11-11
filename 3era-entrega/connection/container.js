const connection = require('./mongoConnect')
const Prod = require('./product.model')
const Users = require('./user.model')


class ContenedorMongo {
    constructor() {
        connection()
    }

    async getProducts(id) {
        if (id) {
            const prod = await Prod.find({ "id": id })
            return prod
        } else {
            const prod = await Prod.find({})
            return prod
        }

    }

    async postProducts(obj) {
        try {
            const add = await new Prod(obj)
            console.log(obj);
            await add.save()
            return { msj: 'Producto añadido!', add }
        } catch (error) {
            console.log(error);
        }
    }


    async getUsers() {
        try {
            const users = await Users.find({})
            return users
        } catch (error) {
            console.log(error);
        }
    }


    async getById(id) {
        try {
            const user = await Users.find({ "_id": id })
            return user
        } catch (error) {
            console.log(error);
        }
    }


    async getByEmail(email) {
        try {
            const user = await Users.find({ "email": email })
            return user
        } catch (error) {
            console.log(error);
        }
    }

    async newUser(obj) {
        try {
            const nuevo = await new Users(obj)
            await nuevo.save()
            return nuevo
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { ContenedorMongo }