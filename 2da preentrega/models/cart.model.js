const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    productos: {
        type: Array,
        default: {},
        required: false
    },
    timestamp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('carritos', CartSchema)