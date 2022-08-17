
const express = require('express')
const fs = require('fs')
const handlebars = require("express-handlebars")
const app = express();
const port = 4000 || process.env.PORT;

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))

app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/views',
        // partialsDir: __dirname + '/views/partials'
    }))

app.set('view engine', 'hbs')
app.set('views', './views')

const productos = [
    { nombre: "Producto 1", precio: 200, img: "https://www.iconfinder.com/icons/2974379/cap_game_hat_play_sport_icon" },
    { nombre: "Producto 2", precio: 100, img: "https://cdn2.iconfinder.com/data/icons/spring-30/30/Watering_Can-256.png" }
]



app.post('/', (req, res) => {
    const obj = req.body
    productos.push(obj)
    console.log(productos);
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/agregar', (req, res) => {
    res.render('main', { productos })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, err => {
    if (err) throw new Error(`error on server: ${port}`)
    console.log(`server is running on port ${port}`);
})