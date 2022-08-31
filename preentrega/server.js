const express = require('express');
const app = express();
const port = process.env.port || 8080
const { Router } = express;
const routerProductos = Router();
const routerCarrito = Router();
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')
const HandleProducts = require('./handleProducts')
const HandleCart = require('./handleCart')
const modoAdmin = true;

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

routerProductos.get('/:id?', async (req, res) => {
    const { id } = req.params;
    const producto = new HandleProducts('./productos.txt')
    const prod = await producto.getById(+id)
    console.log(prod);
    res.send({ prod })
})

routerProductos.post('/', async (req, res) => {
    if (modoAdmin) {
        const obj = req.body
        const producto = new HandleProducts('./productos.txt')
        const prod = await producto.save(obj)
        res.send({
            mensaje: "producto agregado con exito",
            prod

        })
    } else {
        res.sendStatus(402)
    }
})

routerProductos.put('/:id', async (req, res) => {
    if (modoAdmin) {
        const { id } = req.params
        const obj = { ...req.body, id: id }
        const producto = new HandleProducts('./productos.txt')
        const prod = await producto.update(obj)
        res.send({
            mensaje: "Producto actualizado con exito",
            prod
        })

    } else {
        res.sendStatus(402)
    }
})

routerProductos.delete('/:id', async (req, res) => {
    if (modoAdmin) {
        const { id } = req.params;
        const producto = new HandleProducts('./productos.txt')
        const prod = await producto.deleteById(+id)
        res.send({
            mensaje: "producto eliminado"
        })
    } else {
        res.sendStatus(402)
    }
})

routerCarrito.post('/', async (req, res) => {
    const handleCart = new HandleCart('./carrito.txt')
    const nuevoCarrito = await handleCart.newCart();

    res.send({
        mensaje: "Carrito Creado",
        nuevoCarrito
    })
})

routerCarrito.delete('/:id', async (req, res) => {
    const { id } = req.params
    const handleCart = new HandleCart('./carrito.txt');
    const nuevoCarrito = await handleCart.deleteCart(+id)
    res.send({
        status: 200
    })
})

routerCarrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    const handleCart = new HandleCart('./carrito.txt')
    const displayCarrito = await handleCart.getProducts(+id);
    console.log(displayCarrito);
    res.send({
        displayCarrito
    })
})

routerCarrito.post('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params
    const producto = new HandleProducts('./productos.txt')
    const prod = await producto.getById(+id_prod)
    // console.log(prod)
    const handleCart = new HandleCart('./carrito.txt')
    const addToCart = await handleCart.pushProduct(prod, id)
    res.send(addToCart)
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params
    const handleCart = new HandleCart('./carrito.txt')
    const prod = await handleCart.deleteProduct(id, id_prod)
    res.send(
        {
            mensaje: "Producto eliminado",
            prod
        }
    )
})





app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})