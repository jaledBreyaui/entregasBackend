const express = require('express')
const { getAll, postProduct, updateProduct, deleteProduct, deleteAll, getProductsById } = require('../Controllers/productos.controller')
//importar las  funciones hechas en controllers

const { Router } = express
const routerProductos = Router()

routerProductos.get('/', getAll)

routerProductos.get('/:id', getProductsById)

routerProductos.post('/', postProduct)

routerProductos.put('/:id', updateProduct)

routerProductos.delete('/:id', deleteProduct)


module.exports = routerProductos