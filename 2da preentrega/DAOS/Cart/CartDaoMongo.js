const { ContenedorMongo } = require('../../containers/ContenedorMongo')
const Cart = require('../../models/cart.model.js')

class CartDaoMongo extends ContenedorMongo {
    constructor() {
        super()
    }

    async pushProduct(prod, id) {
        try {
            const allCarts = await Cart.find({})
            const carrito = await Cart.find({ id: +id })
            if (carrito) {
                await Cart.updateOne({ id: +id }, { $push: { productos: prod } })
            } if (!carrito.length) {
                let nuevoCarrito = new Cart({
                    id: allCarts.length + 1,
                    timestamp: Date.now(),
                    productos: prod
                })
                await nuevoCarrito.save()
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProd(id, id_prod) {
        try {
            const carrito = await Cart.find({ id: id })
            if (carrito) {
                await Cart.updateOne({ id: +id }, { $pull: { productos: { id: id_prod } } })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartDaoMongo