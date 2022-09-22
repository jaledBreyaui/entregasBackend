const { ContenedorFb } = require('../../containers/ContenedorFB.js')
const admin = require('firebase-admin')
const db = admin.firestore()

class ProdDaoFb extends ContenedorFb {
    constructor() {
        super('productos')
    }

    async save(obj) {
        try {
            const query = db.collection(this.coleccion)
            const queryRead = await query.get()
            let id = queryRead.size
            const doc = query.doc(`${id + 1}`)
            await doc.create(obj)
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const query = db.collection(this.coleccion)
            const queryRead = await query.get()
            const prods = queryRead.docs.map(doc => doc.data())
            return prods
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(obj) {
        try {
            const query = db.collection(this.coleccion)
            const doc = query.doc(obj.id)
            const item = await doc.update(obj)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProdDaoFb 