const Contenedor = require("./contenedor");

const producto = new Contenedor("./productos.txt")

// producto.save({ nombre: "prod 1", precio: 180, thumbnail: "./cccc" })

// producto.getById(2)
// producto.getAll();

// producto.deleteById(2)
producto.deleteAll()