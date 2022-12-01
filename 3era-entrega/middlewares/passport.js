const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;   //-> estrategia
const bcrypt = require('bcrypt')

const { ContenedorMongo } = require('../dao/container')
const mongo = new ContenedorMongo()

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)

}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

passport.use('login',
    new LocalStrategy(
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

passport.use('signup',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
        async (req, email, password, done) => {
            const { nombre, apellido, fechanacimiento, telefono, direccion, archivo } = req.body
            const foto = archivo + `-${Date.now()}`
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

module.exports = passport