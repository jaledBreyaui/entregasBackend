const { Router } = require('express')
const routes = Router()
const checkAuth = require('../middlewares/checkAuth')
const passport = require('passport')
const upload = require('../middlewares/multer')


const { getHome, signed, logOut, register,
    addProducts, postProduct, addToCart, renderCart,
    newOrder, renderProfile } = require('../controllers/controllers')


routes.get('/', getHome)

routes.post('/signin', passport.authenticate('login', {
    successRedirect: '/signed',
    failureRedirect: '/'
}))

routes.get('/signup', register)

routes.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}))

routes.get('/signed', checkAuth, signed)

routes.get('/logout', logOut)

routes.get('/nuevoproducto', addProducts)

routes.post('/nuevoproducto', upload.single('archivo'), postProduct)


routes.post('/addcart', checkAuth, addToCart)


routes.get('/profile', checkAuth, renderProfile)

routes.get('/cart', checkAuth, renderCart)


routes.post('/nuevacompra', checkAuth, newOrder)


module.exports = routes