const express = require('express')
const app = express()
const sendMail = require('./utils/mailer')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const session = require('express-session')
const { ContenedorMongo } = require('./connection/container')
const mongo = new ContenedorMongo()
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const multer = require('multer')

require('dotenv').config()
const PORT = process.env.PORT


app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(session({
    secret: "1234",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        mongoOptions: advancedOptions
    })
}))
app.use(passport.session())

app.use(passport.initialize())


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')



//////MULTER////

const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}`)
    }
})
const upload = multer({ storage })

/////UTILS//////
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}


const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}



const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}

//////PASSPORT//////

passport.use('login', new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
        let users = await mongo.getUsers()
        console.log(email, password);
        let user = users.find(user => user.email === email)
        if (!user) {
            console.log("user not found");
            return done(null, false)
        }
        if (!isValidPassword(user, password)) {
            console.log('Password incorrecto')
            return done(null, false, { message: 'Password incorrect' })
        }

        return done(null, user)
    }))

passport.use('signup', new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
        const { nombre, apellido, fechanacimiento, telefono, direccion, foto } = req.body

        const nuevo = { nombre, apellido, email, password: createHash(password), fechanacimiento, telefono, direccion, foto }
        let users = await mongo.getUsers()
        let user = users.find(user => user.email === email)
        if (user) {
            console.log('User already exists');
            return done(null, false)
        }
        await mongo.newUser(nuevo)
        newUser = await mongo.getByEmail(email)
        sendMail(newUser[0])
        return done(null, newUser[0])
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let user = await mongo.getById(id)
    done(null, user)
})





////LOGIN///////

app.get('/', async (req, res) => {
    const productos = await mongo.getProducts()

    res.render('home', { productos })
})

app.post('/signin', passport.authenticate('login', {
    successRedirect: '/signed',
    failureRedirect: '/'

}), (req, res) => { console.log(req.body); })

///////REGISTRO/////

app.get('/signup', (req, res) => {
    res.render('register')
})

app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}), (req, res) => { console.log(req.body); })

/////ADENTRO////

app.get('/signed', checkAuth, (req, res) => {
    res.render('signed')
})


////sign out////
app.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) { return next(err) }
        res.redirect('/')
    })
})

//////Nuevo Producto//////

app.get('/nuevoproducto', (req, res) => {
    res.render('addprod.ejs')
})

app.post('/nuevoproducto', upload.single('archivo'), async (req, res) => {
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
})

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`server up in port: ${PORT}`);

})


