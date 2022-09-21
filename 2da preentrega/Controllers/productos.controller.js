const { response } = require('express')
const ProdDaoFs = require('../DAOS/Products/ProdDaoFs.js')
const prodDaoFs = new ProdDaoFs()

// const Contenedor = require('../containers/ContenedorFS')
// const contenedor = new Contenedor('./ArchDB/productos.txt')

const ProdDaoMongo = require('../DAOS/Products/ProdDaoMongo')
const prodMongo = new ProdDaoMongo();

// const mongo = true
// const fs = true

// const elegirDB = () => {
//     if (mongo === true) {
//         return "../DAOS/Products/ProdDaoMongo"
//     }
//     if (fs === true) {
//         return "../DAOS/Products/ProdDaoFs.js"
//     }
// }



const getProductsById = async (req, res = response) => {
    const { id } = req.params
    console.log(id);
    const prods = await prodMongo.getById(id)
    console.log(prods);
    res.send({ prods })
}

const getAll = async (req, res = response) => {
    const prods = await prodMongo.getAll()
    res.send({ prods })
}

const postProduct = async (req, res = response) => {
    const { nombre, precio } = req.body
    const post = await prodMongo.save({ nombre, precio })
    res.send({
        msj: "producto agregado",
        // prods: await prodDaoFs.getAll()
    })
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params
    const deleteado = await prodMongo.deleteById(id)
    res.send({
        msj: `prod con id: ${id} deleteado`,
    })
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params
    const obj = { ...req.body, id: id }
    await prodMongo.updateById(obj)
    res.send({
        msj: "Producto actualizado!",
        prods: await prodMongo.getAll()
    })

}


module.exports = { getProductsById, getAll, postProduct, deleteProduct, updateProduct }