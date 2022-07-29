const express = require("express")
const app = express()
const contenedor = require("./contenedor")
const producto = new contenedor("./productos.txt")

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`escuchando en el server ${server.address().port}`);
})

server.on("error", (err) => {
    console.log(err);
})

app.get("/", (req, res) => {
    res.send("<h1>Bienvenido al servidor express </h1>")
})

let count = 0

app.get("/visitas", (req, res) => {
    count++
    res.send(`visitas : ${count}`)
}
)

app.get("/fyh", (req, res) => {
    res.send({ fyh: new Date() })
})

app.get("/productos", async (req, res) => {
    try {

        const prod = await producto.getAll()
        res.send(prod)
    } catch (error) {
        res.send(error)
    }
})

app.get("/productoRandom", async (req, res) => {

    // no pude resolver esto. Puedo loguear en la consola el producto pero no lo pude hacer aparecer en pantalla me tira undefined :/
    try {
        let prod = await producto.getById(Math.floor(Math.random() * 3 + 1))
        prod.then()

    } catch (error) {
        res.send(error)
    }
})