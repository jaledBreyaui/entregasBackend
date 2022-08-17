const express = require('express');
const app = express()
port = 4000

app.use(express.json());
app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: true }))

const productos = [
    { nombre: "Producto 1", precio: 200, img: "https://www.iconfinder.com/icons/2974379/cap_game_hat_play_sport_icon" },
    { nombre: "Producto 2", precio: 100, img: "https://cdn2.iconfinder.com/data/icons/spring-30/30/Watering_Can-256.png" }
]

app.set('view engine', 'ejs')
app.set('views', './views')

app.get("/productos", (req, res) => {
    res.render('index', { productos })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    const obj = req.body;
    productos.push(obj)
    console.log(obj);
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(4000, err => {
    if (err) throw new Error(err)
    console.log(`Listening on port ${port}`);
})