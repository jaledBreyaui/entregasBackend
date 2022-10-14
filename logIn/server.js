const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const routerSession = express.Router()
const app = express()
require('dotenv').config()
const { ContenedorMongo } = require('./connection/container')
const mongo = new ContenedorMongo()


app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(session({
    secret: '1234',
    saveUninitialized: true,
    resave: true,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_HOST}/test`,
        mongoOptions: advancedOptions
    })
}))

routerSession.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/index.html')
})

routerSession.post('/login', async (req, res) => {
    try {
        const { usuario } = req.body
        req.session.usuario = usuario
        if (usuario == 'Jaled') {
            res.redirect('/session/logueado')
        } else {
            return res.status(400).send(`<h1>Datos incorrectos</h1>`)
        }
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: error.message
        })
    }
})

routerSession.get('/logueado', async (req, res) => {
    const mensajes = await mongo.getMsjs()
    const user = req.session.usuario
    res.render('logueado', { user, mensajes })
})


routerSession.use('/logout', async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`)
            }
        })

        return res.status(200).redirect('/session')
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: error.message
        })
    }
})



app.use('/session', routerSession)

app.listen(3000, () => {
    console.log('server running!');
})

