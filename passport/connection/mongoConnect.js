const mongoose = require('mongoose')
require('dotenv').config()

const connectMongo = async () => {
    try {
        const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_HOST}/test`
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

///