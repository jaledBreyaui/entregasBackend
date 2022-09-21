const mongoose = require('mongoose')

const ProdSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('productos', ProdSchema)