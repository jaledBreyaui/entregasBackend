const express = require("express")
const multer = require('multer')
const app = express();
const { Router } = express;
const routerProductos = Router();
const Contenedor = require('./contenedor')


app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: true }))


routerProductos.get("/", async (req, res) => {
    try {
        const producto = new Contenedor("./productos.txt")
        const prod = await producto.getAll()
        console.log(prod);
        res.send(prod)
    } catch (error) {
        res.send(error)
    }
})

routerProductos.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const producto = new Contenedor("./productos.txt")
        const prod = await producto.getById(+id)
        res.json(prod)
    } catch (error) {
        res.send(error)
    }
})

routerProductos.put("/:id", (req, res) => {
    try {
        const { id } = req.params
        const obj = {
            "nombre": "Jaled",
            "precio": "2",
            "tmb": "./img/photo.jpg",
            "id": id
        }

        // const producto = new Contenedor("./productos.txt")
        // const update = await producto.update(obj)
        console.log(obj);

    } catch (error) {
        res.send(error)
    }
})





// routerProductos.put('/:id', (req, res) => {
//     const { nombre, precio, tmb } = req.body;

// })

// routerProductos.post('/')



app.use('/api/productos', routerProductos)

app.listen(4000, () => {
    console.log('server on port 4000');
})

// const storage = multer.diskStorage({
//     destination: (req, _file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.originalname}`)
//     }
// })

// const upload = multer({ storage })

// app.post('/uploadfile', upload.single('archivo'), (req, res, next) => {
//     const { file } = req
//     console.log('aca');
//     console.log(file);
//     if (!file) {
//         const err = new Error('Pls subí un archivo')
//         err.httpStatusCode = 400
//         return next(err)
//     }
//     res.send(file)
// })

// app.post('/uploadfiles', upload.array('archivos'), (req, res, next) => {
//     const { files } = req
//     console.log(files);
//     if (!files || files.length === 0) {
//         const err = new Error('Pls subí un archivo')
//         err.httpStatusCode = 400
//         return next(err)
//     }
//     res.send(files)
// })

// app.get('/index', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })

// app.get('/', (req, res) => {
//     res.send('página principal')
// })