const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: String, required: true
    },
    productos: {
        type: Array, required: true
    }
})

module.exports = mongoose.model('carritos', cartSchema)