const { Router } = require('express')
const routes = Router()
const checkAuth = require('../middlewares/checkAuth')
const passport = require('passport')
const { uploadProfile, uploadProd } = require('../middlewares/multer')


const { getHome, signed, logOut, register,
    addProducts, postProduct, addToCart, renderCart,
    newOrder, renderProfile, handleProfilePic } = require('../controllers/controllers')


routes.get('/', getHome)

routes.post('/signin', passport.authenticate('login', {
    successRedirect: '/signed',
    failureRedirect: '/'
}))

routes.get('/signup', register)

routes.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}), uploadProfile.single('archivo'), handleProfilePic)

routes.get('/signed', checkAuth, signed)

routes.get('/logout', logOut)

routes.get('/nuevoproducto', addProducts)

routes.post('/nuevoproducto', uploadProd.single('fotoProducto'), postProduct)


routes.post('/addcart', checkAuth, addToCart)


routes.get('/profile', checkAuth, renderProfile)

routes.get('/cart', checkAuth, renderCart)


routes.post('/nuevacompra', checkAuth, newOrder)


module.exports = routes