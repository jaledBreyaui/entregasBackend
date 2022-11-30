const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        required: true,
        type: Object
    },
    productos: {
        required: true,
        type: Array
    },
    fecha: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('orders', orderSchema)