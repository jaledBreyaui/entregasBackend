const { response } = require('express')
const ProdDaoFs = require('../DAOS/Products/ProdDaoFs.js')
const prodDaoFs = new ProdDaoFs()

const mongo = true;
const fs = false;

const DbChooser = () => {
    if (mongo) {
        return '../DAOS/Cart/CartDaoMongo'
    } if (fs) {
        return '../DAOS/Cart/CartDaoFs.js'
    }
}

const CartDao = require(DbChooser())
const cartDao = new CartDao()




const newCart = async (req, res = response) => {
    try {
        await cartDao.newCart()
        res.send("carrito creado!")
    } catch (error) {
        console.log(error);
    }
}

const getCart = async (req, res = resposne) => {
    try {
        const { id } = req.params
        const cart = await cartDao.getById(+id)
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
        const cart = await cartDao.getById(+id)
        res.send({
            cart: cart
        })
    } catch (error) {
        console.log(error);
    }
}

const addToCart = async (req, res = response) => {
    try {
        const { id, id_prod } = req.params
        const prod = await prodDaoFs.getById(id_prod)
        const push = await cartDao.pushProduct(prod, +id)
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
        const deleted = await cartDao.deleteProd(+id, +id_prod)
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
        await cartDao.deleteById(+id)
        res.send({
            msj: `Carrito ${id} eliminado`
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { newCart, addToCart, deleteCart, getCart, deleteProduct, getProducts }