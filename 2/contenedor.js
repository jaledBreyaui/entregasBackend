const fs = require("fs")

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(obj) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, "utf8");
            let dataArchParse = JSON.parse(dataArch)
            // console.log(dataArch);

            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj, id: dataArchParse.length + 1 }], null, 2))
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: 1 }], null, 2))
            }
            // console.log(dataArchParse);

        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        let dataArch = await fs.promises.readFile(this.ruta, "utf8");
        let dataArchParse = JSON.parse(dataArch)
        dataArchParse.forEach(data => {
            if (data.id === id)
                console.log(data);
        });
    }

    async getAll() {
        let dataArch = await fs.promises.readFile(this.ruta, "utf8");
        let dataArchParse = JSON.parse(dataArch)
        console.log(dataArchParse);
    }

    async deleteById(id) {
        let dataArch = await fs.promises.readFile(this.ruta, "utf8");
        let dataArchParse = JSON.parse(dataArch)
        let newData = []
        dataArchParse.filter(data => {
            if (data.id !== id) {
                newData.push(data)
                fs.promises.writeFile(this.ruta, JSON.stringify(newData, null, 2))
            }
        });
    }

    async deleteAll() {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
    }
}

module.exports = Contenedor