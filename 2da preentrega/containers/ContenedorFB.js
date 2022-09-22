var adminConnection = require("firebase-admin");

var serviceAccount = require("../nodejs-b592d-firebase-adminsdk-ekm6u-fe6d5a2d23.json");

adminConnection.initializeApp({
    credential: adminConnection.credential.cert(serviceAccount)
});

console.log("Firestore conectado");

const admin = require('firebase-admin')
const db = admin.firestore()


class ContenedorFb {
    constructor(coleccion) {
        this.coleccion = coleccion
    }

    async getById(id) {
        try {
            const query = db.collection(this.coleccion)
            const queryRead = await query.get()
            const prods = queryRead.docs.filter(doc => (doc.id === id))
            const producto = prods.map(doc => doc.data())
            return producto
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        const query = db.collection(this.coleccion)
        const doc = query.doc(id)
        await doc.delete()
        console.log("User deleted!");
    }
}

module.exports = { ContenedorFb } 