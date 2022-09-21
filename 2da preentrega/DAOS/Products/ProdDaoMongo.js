const { ContenedorMongo } = require('../../containers/ContenedorMongo')
const mongoose = require('mongoose')
const Prod = require('../../models/prod.model')

class ProdDaoMongo extends ContenedorMongo {
    constructor() {
        super()
    }

    async save(obj) {
        try {
            let producto = new Prod(obj)
            await producto.save()
            return producto
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await Prod.deleteOne({ _id: id })
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const productos = await Prod.find({})
            return productos
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(obj) {
        try {
            const prod = await Prod.find({ _id: obj.id })
            console.log(prod);
            await Prod.updateOne({ _id: obj.id }, { nombre: obj.nombre, precio: obj.precio })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProdDaoMongo