const fs = require('fs')


class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta
    }

    async #readFileFunc(ruta) {
        let arch = await fs.promises.readFile(ruta, "utf-8")
        let archParseado = await JSON.parse(arch)
        return archParseado
    }

    async getById(id) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta)
            let producto = dataArchParse.find(prod => prod.id === +id)
            console.log(producto);
            if (producto) {
                return producto
            } else {
                return dataArchParse
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta)
            let newData = []
            dataArchParse.filter(data => {
                if (data.id !== +id) {
                    newData.push(data)
                    newData.map((prod, i) => {
                        prod.id = i + 1;
                    })
                }
            });
            fs.promises.writeFile(this.ruta, JSON.stringify(newData, null, 2))
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { ContenedorArchivo } 