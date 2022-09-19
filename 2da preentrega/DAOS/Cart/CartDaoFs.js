const { ContenedorArchivo } = require('../../containers/ContenedorFS.js')
const fs = require('fs')


class CartDaoFs extends ContenedorArchivo {
    constructor() {
        super('./ArchDB/cart.txt')
    }

    async #readFileFunc(ruta) {
        let archivo = await fs.promises.readFile(ruta, 'utf-8')
        let archivoParseado = await JSON.parse(archivo)
        return archivoParseado
    }

    async newCart() {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta, "utf-8")
            if (dataArchParse.length) {
                const id = dataArchParse.length + 1
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { id: id, timeStamp: Date.now(), productos: [] }], null, 2))
                return `Id de carrito : ${id}`
            }
            else {
                const id = 1
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ id: id, timeStamp: Date.now(), productos: [] }], null, 2))
                return `Id de carrito : ${id}`
            }
        } catch (error) {
            console.log(error);
        }
    }

    async pushProduct(prod, id) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta, "utf-8")
            dataArchParse[+id - 1].productos.push(prod)
            console.log(dataArchParse);
            fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParse, null, 2))
            return JSON.stringify(dataArchParse[+id - 1])
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProd(id, id_prod) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta)
            let carro = dataArchParse[+id - 1].productos
            const nuevoCarro = carro.filter(producto => producto.id !== id_prod)
            dataArchParse[+id - 1].productos = nuevoCarro
            fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParse, null, 2))
            console.log(nuevoCarro);
            return dataArchParse[+id - 1]
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = CartDaoFs