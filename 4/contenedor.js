const fs = require("fs")

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async #readFileFunc(ruta) {
        let archivo = await fs.promises.readFile(ruta, 'utf-8')
        let archivoParseado = await JSON.parse(archivo)
        return archivoParseado
    }

    async save(obj) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta)
            console.log(dataArchParse);
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj, id: dataArchParse.length + 1 }], null, 2))
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: 1 }], null, 2))
            }


        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        let dataArch = await fs.promises.readFile(this.ruta, "utf8");
        let dataArchParse = JSON.parse(dataArch)
        let producto = dataArchParse.find(prod => prod.id === id)
        if (producto) {
            return producto
        } else {
            return "Producto no encontrado"
        }
    }

    async update(obj) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta);
            const viejo = dataArchParse.find(prod => prod.id === obj.id)
            if (viejo) {
                dataArchParse[(obj.id - 1)] = obj
                console.log(dataArchParse);
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParse, null, 2))                // console.log(dataArchParse.length);
            }
            else if (viejo === undefined) {
                // console.log(dataArchParse.length);
                return { error: "no existe el producto" }
            }

        } catch (error) {
            return error
        }
    }

    async getAll() {
        let dataArch = await fs.promises.readFile(this.ruta, "utf8");
        let dataArchParse = JSON.parse(dataArch)
        return dataArchParse
    }

    async deleteById(id) {
        try {
            let dataArchParse = await this.#readFileFunc(this.ruta)
            let newData = []
            dataArchParse.filter(data => {
                if (data.id !== id) {
                    newData.push(data)
                    newData.map((prod, i) => {
                        prod.id = i + 1;
                    })
                    fs.promises.writeFile(this.ruta, JSON.stringify(newData, null, 2))
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
    }


}

module.exports = Contenedor