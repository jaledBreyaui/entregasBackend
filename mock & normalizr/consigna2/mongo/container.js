const connectMongo = require('../connection/mongoConnection')
const Msj = require('./msj.model')

class ContenedorMongo {
    constructor() {
        connectMongo()
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

}

module.exports = { ContenedorMongo }