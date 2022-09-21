const express = require('express')
const { newCart, addToCart, deleteCart, getCart, deleteProduct, getProducts } = require('../Controllers/cart.controller.js')

const { Router } = express
const routerCarrito = Router()

routerCarrito.get('/', newCart)

routerCarrito.get('/:id', getCart)

routerCarrito.get('/:id/productos', getProducts)

routerCarrito.post('/:id/:id_prod', addToCart)

routerCarrito.delete('/:id', deleteCart)

routerCarrito.delete('/:id/:id_prod', deleteProduct)

module.exports = routerCarrito