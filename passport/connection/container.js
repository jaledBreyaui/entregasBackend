const connection = require('./mongoConnect')
const Msj = require('./msj.model')
const Users = require('./user.model')


class ContenedorMongo {
    constructor() {
        connection()
    }

    async getMsjs() {
        try {
            const mensajes = await Msj.find({})
            if (mensajes) {
                return mensajes
            } else {
                return 'No hay mensajes todavia'
            }
        } catch (error) {
            console.log(error);
        }
    }

    async postMsj(mensaje) {
        try {
            const msj = new Msj(mensaje)
            const todos = await Msj.find({})
            await msj.save()
            return todos
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