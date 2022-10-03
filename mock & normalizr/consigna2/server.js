const { ContenedorMongo } = require('./mongo/container')
const mongo = new ContenedorMongo()

const express = require('express')
const app = express()

const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp)

// const traerData = async () => {
//     const data = 
//     dataMap = data.map(obj => obj)
//     return dataMap
// }

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

io.on('connection', async socket => {
    socket.emit('chat-server', await mongo.getMsjs())

    socket.on('new-message', async obj => {
        await mongo.postMsj(obj)
        io.sockets.emit('chat-server', obj)
    })
})




serverHttp.listen(8080, () => {
    console.log(`Listening on port 8080`);
})