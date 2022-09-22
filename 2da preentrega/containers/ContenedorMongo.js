const mongoose = require('mongoose')
const connectMongo = require('../connections/connectMongo.js')
const Prod = require('../models/prod.model')

class ContenedorMongo {
    constructor() {
        connectMongo()
    }

    async getById(id) {
        try {
            const productos = await Prod.find({ id: id })
            return productos
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = { ContenedorMongo }