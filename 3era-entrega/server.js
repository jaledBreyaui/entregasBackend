require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT


//session
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

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
    cookie: { maxAge: 1000 * 60 * 24 }
}))


const passport = require('./middlewares/passport')
app.use(passport.session())
app.use(passport.initialize())


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.use('/', routes)

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`server up in port: ${PORT}`);
})



