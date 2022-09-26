const mongoose = require('mongoose')

const connectMongo = async () => {
    try {
        // const url = "mongodb://localhost:27017/colegio"
        const url = ""
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