const fs = require('fs')
const HandleProducts = require('./handleProducts')

class HandleCart {
    constructor(ruta) {
        this.ruta = ruta
    }

    async #readFileFunc(ruta) {
        let archivo = await fs.promises.readFile(ruta, 'utf-8')
        let archivoParseado = await JSON.parse(archivo)
        return archivoParseado
    }

    async newCart() {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta)
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

    async deleteCart(id) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta);
            let newData = []
            dataArchParse.filter(data => {
                if (data.id !== id) {
                    newData.push(data)
                    newData.map((prod, i) => {
                        prod.id = i + 1;
                    })
                    console.log(newData);
                }
            });
            fs.promises.writeFile(this.ruta, JSON.stringify(newData, null, 2))
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(id) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta);
            const carrito = dataArchParse.filter(cart => cart.id === id)
            const cartProducts = JSON.stringify(carrito[0].productos, null, 2)
            return `Carrito id: ${carrito[0].id}. Productos : ${cartProducts}`
        } catch (error) {
            return error
        }
    }

    async pushProduct(prod, id) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta)
            dataArchParse[+id - 1].productos.push(prod)
            console.log(dataArchParse);
            fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParse, null, 2))
            return JSON.stringify(dataArchParse[+id - 1])
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id, id_prod) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta)
            let carro = dataArchParse[+id - 1].productos
            const nuevoCarro = carro.filter(producto => producto.id !== +id_prod)
            dataArchParse[+id - 1].productos = nuevoCarro
            fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParse, null, 2))
            return dataArchParse[+id - 1]

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = HandleCart