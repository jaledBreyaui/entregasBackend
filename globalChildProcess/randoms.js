const { query } = require("express")
let arr = []
const calculo = (num) => {
    for (let i = 0; i < num; i++) {
        arr.push(Math.floor(Math.random() * num))

    }
    return arr
}

process.on('message', mensajeComputoSend => {
    console.log(mensajeComputoSend, "child")
    process.send(`${calculo(mensajeComputoSend)}`)
})