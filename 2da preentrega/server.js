const express = require('express');
const app = express();

const routerProductos = require('./routes/productos.route.js')
const routerCarrito = require('./routes/cart.route.js')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


app.listen(4000, err => {
    if (err) throw err
    console.log("listening on port 4000...");
})