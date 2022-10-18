const mongoose = require('mongoose')

const MsjSchema = new mongoose.Schema({
    nombre: {
        type: Object,
        default: {},
        required: true
    },
    msj: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('mensajes', MsjSchema)