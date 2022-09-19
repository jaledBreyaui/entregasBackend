const { ContenedorArchivo } = require('../../containers/ContenedorFS')
const fs = require('fs')

class ProdDaoFs extends ContenedorArchivo {
    constructor() {
        super('./ArchDB/productos.txt')
    }

    async getAll() {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataArchParse = JSON.parse(dataArch)
            return dataArchParse
        } catch (error) {
            console.log(error);
        }
    }

    async save(obj) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, "utf-8")
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj, id: dataArchParse.length + 1 }], null, 2))
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj, id: 1 }], null, 2))
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(obj) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, "utf-8")
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse[obj.id - 1]) {
                dataArchParse[obj.id - 1] = obj
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParse, null, 2))
            } else if (art == undefined) {
                return { error: "no existe el producto" }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProdDaoFs 