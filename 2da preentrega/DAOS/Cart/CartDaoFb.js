const { ContenedorFb } = require('../../containers/ContenedorFB.js')
const admin = require('firebase-admin')
const db = admin.firestore()

class CartDaoFb extends ContenedorFb {
    constructor() {
        super('carritos')
    }

    async pushProduct(id, prod) {
        const query = db.collection(this.coleccion)
        const queryRead = await query.get()
        const carros = queryRead.docs.filter(doc => doc.id === id)
        if (carros) {
            let productosprevios = carros.map(doc => doc.data())[0].productos
            const doc = query.doc(id)
            await doc.update({
                productos: [...productosprevios, prod]
            })
        }
        if (!carros.length) {
            let id = queryRead.size
            const doc = query.doc(`${id + 1}`)
            await doc.create({
                productos: [prod],
                timestamp: Date.now()
            })
        }
    }

    async onlyProducts(id) {
        try {
            const query = db.collection(this.coleccion)
            const queryRead = await query.get()
            const carros = queryRead.docs.filter(doc => doc.id === id)
            const carro = carros.map(doc => doc.data())
            return carro[0].productos
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProd(id, id_prod) {
        const query = db.collection(this.coleccion)
        const queryRead = await query.get()
        const carro = queryRead.docs.filter(doc => doc.id === id)
        if (carro) {
            let productos = carro.map(doc => doc.data())[0].productos
            const quedan = productos.filter(prod => prod.id !== +id_prod)
            const doc = query.doc(id)
            await doc.update({
                productos: quedan
            })

        }
    }
}

module.exports = CartDaoFb