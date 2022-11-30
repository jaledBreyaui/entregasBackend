const express = require('express')
const app = express()

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { isValidPassword, createHash } = require('./middlewares/passport')


const session = require('express-session')

const { ContenedorMongo } = require('./dao/container')
const mongo = new ContenedorMongo()
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

require('dotenv').config()
const PORT = process.env.PORT

const routes = require('./routes/routes')


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
    }),
    cookie: { maxAge: 60 * 60 * 24 }
}))

app.use(passport.session())
app.use(passport.initialize())


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


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

app.use('/', routes)

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`server up in port: ${PORT}`);
})



