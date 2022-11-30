const connection = require('../config/mongoConnect')
const Prod = require('../models/product.model')
const Users = require('../models/user.model')
const Cart = require('../models/cart.model')
const Order = require('../models/order.model')
const sendSms = require('../middlewares/neworder.twilio')
const newOrderMail = require('../middlewares/neworder.mailer')


class ContenedorMongo {
    constructor() {
        connection()
    }

    //////////////Prod func

    async getProducts(id) {
        try {
            if (id) {
                const prod = await Prod.find({ "_id": id })
                return prod
            } else {
                const prod = await Prod.find({})
                return prod
            }
        } catch (error) {
            return error
        }
    }

    async postProducts(obj) {
        try {
            const add = await new Prod(obj)
            console.log(obj);
            await add.save()
            return { msj: 'Producto añadido!', add }
        } catch (error) {
            console.log(error);
        }
    }


    //////User Func/////////////////////

    async getUsers() {
        try {
            const users = await Users.find({})
            return users
        } catch (error) {
            console.log(error);
        }
    }


    async getById(id) {
        try {
            const user = await Users.find({ "_id": id })
            return user
        } catch (error) {
            console.log(error);
        }
    }


    async getByEmail(email) {
        try {
            const user = await Users.find({ "email": email })
            return user
        } catch (error) {
            console.log(error);
        }
    }

    async newUser(obj) {
        try {
            const nuevo = await new Users(obj)
            await nuevo.save()
            return nuevo
        } catch (error) {
            console.log(error);
        }
    }

    /////////////////Cart funcs//////////
    async getCart(userId) {
        try {
            const cart = await Cart.find({ 'userId': userId })
            return cart
        } catch (error) {
            return error
        }
    }

    async addToCart(userId, prodId) {
        try {
            const cart = await Cart.find({ 'userId': userId })
            const producto = await this.getProducts(prodId)
            const { nombre, precio } = producto[0]
            const productos = { nombre, precio, prodId, cantidad: 1 }
            if (cart.length) {
                await Cart.findOneAndUpdate({ 'userId': userId }, { $push: { productos: productos } })
            } else {
                console.log('creo un cart');
                const newCart = await new Cart({ userId, productos })
                await newCart.save()
                return newCart
            }

        } catch (error) {
            return error
        }
    }

    async deleteCart(userId) {
        try {
            await Cart.deleteOne({ 'userId': userId })
        } catch (error) {
            return error
        }
    }


    //////////Orden de compra/////////

    async newOrder(productos, userId) {
        try {
            const usuario = await this.getById(userId)
            const tiempoTranscurrido = Date.now();
            const hoy = new Date(tiempoTranscurrido);
            const fecha = hoy.toDateString()
            console.log(fecha);
            const newOrder = await new Order({ user: usuario[0], productos, fecha })
            await newOrder.save()
            sendSms()
            newOrderMail(usuario[0], productos)
            await this.deleteCart(userId)
            return newOrder

        } catch (error) {
            return error
        }
    }
}
module.exports = { ContenedorMongo }


