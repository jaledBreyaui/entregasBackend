const { ContenedorMongo } = require('../dao/container')
const mongo = new ContenedorMongo()


const getHome = async (req, res) => {
    const productos = await mongo.getProducts()
    res.render('home', { productos })
}


const signed = async (req, res) => {
    const productos = await mongo.getProducts()
    res.render('signed', { req, productos })
}

const register = (req, res) => {
    res.render('register')
}

const logOut = (req, res, next) => {
    req.logOut((err) => {
        if (err) { return next(err) }
        res.redirect('/')
    })
}
const addProducts = (req, res) => {
    res.render('addprod.ejs')
}

const postProduct = async (req, res) => {
    const { file } = req
    if (file) {
        const imagen = `${file.filename}`
        const { nombre, precio, tags, marca } = req.body
        const obj = { nombre, precio, tags, imagen, marca }
        if (obj) {
            await mongo.postProducts(obj)
        }
    }
    res.redirect('/nuevoproducto')
}

const addToCart = async (req, res) => {
    const prodId = req.body.id
    const userId = req.user[0].id
    await mongo.addToCart(userId, prodId)
    res.redirect('/signed')
}

const renderCart = async (req, res) => {
    const userId = req.user[0].id
    const cart = await mongo.getCart(userId)
    const productos = []
    if (cart.length) {
        const productos = cart[0].productos
        console.log(productos);
        res.render('cart.ejs', { req, productos })
    } else {
        res.render('cart.ejs', { req, productos })
    }

}

const newOrder = async (req, res) => {
    const userId = req.user[0].id
    const cart = await mongo.getCart(userId)
    const productos = cart[0].productos
    const usuario = await mongo.getById(userId)
    await mongo.newOrder(productos, userId)
    res.redirect('/signed')
}

const renderProfile = async (req, res) => {
    res.render('profile', { req })
}


module.exports = { getHome, signed, logOut, register, addProducts, postProduct, addToCart, renderCart, newOrder, renderProfile }