const { response } = require('express')
const CartDaoFs = require('../DAOS/Cart/CartDaoFs.js')
const cartDaoFs = new CartDaoFs();
const ProdDaoFs = require('../DAOS/Products/ProdDaoFs.js')
const prodDaoFs = new ProdDaoFs()
const CartDaoMongo = require('../DAOS/Cart/CartDaoMongo')
const cartDaoMongo = new CartDaoMongo()

const newCart = async (req, res = response) => {
    try {
        await cartDaoFs.newCart()
        res.send("carrito creado!")
    } catch (error) {
        console.log(error);
    }
}

const getCart = async (req, res = resposne) => {
    try {
        const { id } = req.params
        const cart = await cartDaoFs.getById(+id)
        res.send({
            cart
        })
    } catch (error) {
        console.log(error);
    }
}

const getProducts = async (req, res = response) => {
    try {
        const { id } = req.params
        const cart = await cartDaoFs.getById(+id)
        res.send({
            cart: cart.productos
        })
    } catch (error) {
        console.log(error);
    }
}

const addToCart = async (req, res = response) => {
    try {
        const { id, id_prod } = req.params
        const prod = await prodDaoFs.getById(id_prod)
        const push = await cartDaoMongo.pushProduct(prod, +id)
        res.send({
            msj: "producto agregado",
            prod
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res = response) => {
    try {
        const { id, id_prod } = req.params
        const prod = await prodDaoFs.getById(+id_prod)
        const deleted = await cartDaoMongo.deleteProd(+id, +id_prod)
        res.send({
            deleted
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteCart = async (req, res = response) => {
    try {
        const { id } = req.params
        await cartDaoMongo.deleteById(+id)
        res.send({
            msj: `Carrito ${id} eliminado`
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { newCart, addToCart, deleteCart, getCart, deleteProduct, getProducts }