const mongoose = require('mongoose')

const MsjSchema = new mongoose.Schema({
    nombre: {
        type: Map,
        default: {},
        required: true
    },
    msj: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('mensajes', MsjSchema)