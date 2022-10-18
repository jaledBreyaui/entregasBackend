const express = require('express')
const app = express();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const session = require('express-session')
const { ContenedorMongo } = require('./connection/container')
const mongo = new ContenedorMongo()
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

require('dotenv').config()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: "1234",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_HOST}/test`,
        mongoOptions: advancedOptions
    })
}))
app.use(passport.session())

app.use(passport.initialize())

//////////////EJS//////////////////////´

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

////////////////PASSPORT/////////////
passport.use('login', new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
        let users = await mongo.getUsers()
        let user = users.find(user => user.email === email)
        if (!user) {
            console.log("user not found");
            return done(null, false)
        }
        if (user.password !== password) {
            console.log(user.password, password);
            return done(null, false)
        }
        return done(null, user)
    }))


passport.use('signup', new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
        const { nombre, apellido } = req.body
        const nuevo = { nombre, apellido, email, password }
        let users = await mongo.getUsers()
        let user = users.find(user => user.email === email)
        if (user) {
            console.log('User already exists');
            return done(null, false)
        }
        await mongo.newUser(nuevo)
        newUser = await mongo.getByEmail(email)
        return done(null, newUser[0])
    }
))

////Serialize Deserialize////
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let user = await mongo.getById(id)
    done(null, user)
})

///auth middle//

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}



////////////////RUTAS/////////////////

app.get('/login', async (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login'
}), (req, res) => { })

app.get('/signup', (req, res) => {

    res.render('register')
})

app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/signup'
}), (req, res) => { })

app.get('/home', checkAuth, async (req, res) => {
    console.log(req.user[0].nombre);
    const mensajes = await mongo.getMsjs()
    res.render('home', { req, mensajes })
})

app.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})

app.post('/postmsj', async (req, res) => {
    const { msj } = req.body;
    obj = { msj, nombre: req.user[0] }
    await mongo.postMsj(obj)
    res.redirect('/home')
})

app.listen(4000, () => {
    console.log('server up!');
})