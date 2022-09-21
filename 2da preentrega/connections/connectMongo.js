const mongoose = require('mongoose')

const connectMongo = async () => {
    try {
        // const url = "mongodb://localhost:27017/colegio"
        const url = "mongodb+srv://jaled725:Merolla22@cluster0.30tm7us.mongodb.net/Ecommerce"
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