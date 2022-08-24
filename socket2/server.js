const express = require('express')
const app = express()
const PORT = 4000;
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

app.use(express.static(__dirname + '/public'))
app.use(express.json)
app.use(express.urlencoded({ extended: true }))

const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp)

const productos = [{ nombre: "producto uno", precio: 150 },
{ nombre: "producto dos", precio: 120 },
{ nombre: "producto tres", precio: 200 }]

const mensajes = [{ nombre: "Coccaro", msj: "Hola!" }]

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

io.on('connection', socket => {
    socket.emit('mensaje-server', productos)
    socket.emit('chat-server', mensajes)

    socket.on('nuevo-producto', producto => {
        productos.push(producto)
        console.log(productos);
        io.sockets.emit('mensaje-server', productos)
    })

    socket.on('nuevo-mensaje', obj => {
        mensajes.push(obj)
        console.log(obj);
        io.sockets.emit('chat-server', mensajes)
    })
})

serverHttp.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})