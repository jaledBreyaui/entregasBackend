const mongoose = require('mongoose')
require('dotenv').config()

const connectMongo = async () => {
    try {
        const url = process.env.MONGODB_URI
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Mongodb conectado!");
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectMongo
