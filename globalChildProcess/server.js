const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const { fork } = require('child_process')


const yargs = require('yargs/yargs')(process.argv.slice(2))
console.log(yargs.argv);

const PORT = yargs.argv.port || 8080

datos = {
    argumentosDeEntrada: yargs.argv,
    plataforma: process.platform,
    nodeVersion: process.version,
    memoria: process.memoryUsage().rss,
    path: process.cwd(),
    processId: process.pid,
    carpeta: process.title
}

app.get('/info', (req, res) => {
    res.send(`${JSON.stringify(datos)}`)
})

app.get('/api/random', (req, res) => {
    const num = req.query.num
    const computo = fork('randoms.js')
    computo.send(num ? num : 500)
    computo.on('message', mensaje => {
        res.json(mensaje)
    })
})

app.listen(PORT, err => {
    if (err) throw new Error(err)
    console.log('server up!');
})