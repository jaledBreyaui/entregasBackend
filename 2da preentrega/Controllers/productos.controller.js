const { response } = require('express')
const ProdDaoFs = require('../DAOS/Products/ProdDaoFs.js')
const prodDaoFs = new ProdDaoFs()

// const Contenedor = require('../containers/ContenedorFS')
// const contenedor = new Contenedor('./ArchDB/productos.txt')

const getProductsById = async (req, res = response) => {
    const { id } = req.params
    console.log(id);
    const prods = await prodDaoFs.getById(id)
    console.log(prods);
    res.send({ prods })
}

const getAll = async (req, res = response) => {
    const prods = await prodDaoFs.getAll()
    res.send(prods)
}

const postProduct = async (req, res = response) => {
    const { nombre, precio } = req.body
    const post = await prodDaoFs.save({ nombre, precio })

    res.send({
        msj: "producto agregado",
        prods: await prodDaoFs.getAll()
    })
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params
    const deleteado = await prodDaoFs.deleteById(id)
    res.send({
        msj: `prod con id: ${id} deleteado`,
    })
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params
    const obj = { ...req.body, id: +id }
    await prodDaoFs.updateById(obj)
    res.send({
        msj: "Producto actualizado!",
        prods: await prodDaoFs.getAll()
    })

}


module.exports = { getProductsById, getAll, postProduct, deleteProduct, updateProduct }