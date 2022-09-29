const express = require('express')
const app = express()
const { Router } = express;
const routerProductos = Router();
const faker = require('@faker-js/faker').faker
faker.locale = 'es'
app.use(express.json())

function generarProductos() {
    return {
        producto: faker.commerce.product(),
        precio: faker.commerce.price(),
        descripcion: faker.commerce.productDescription(),
        imagen: faker.image.image()
    }
}

routerProductos.get('/', (req, res) => {
    res.send({
        productoUno: generarProductos(),
        productoDos: generarProductos(),
        productoTres: generarProductos(),
        productoCuatro: generarProductos(),
        productoCinco: generarProductos()
    })
})




app.use('/api/productos-test', routerProductos)

app.listen(4000, err => {
    if (err) throw err
    console.log('listening on port 4000 :)');
})