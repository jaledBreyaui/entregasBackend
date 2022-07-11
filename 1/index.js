
class Usuario {
    constructor(nombre, apellido, libros = [], [...mascotas]) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros
    };


    getFullName() {
        console.log(`Hola! me llamo ${this.nombre} ${this.apellido}`);
    }

    addMascota(nombre) {
        this.mascotas.push(nombre)
    }
    countMascotas() {
        console.log(`${this.nombre} tiene ${this.mascotas.length} mascotas`);
    }
    addBook(nombre, autor) {
        this.libros = [...this.libros, { nombre: nombre, autor: autor }]
    }

    getBook() {
        let nombres = []
        this.libros.map((libro) => nombres.push(libro.nombre))
        console.log(nombres);
    }
}



let usuario1 = new Usuario("Jaled", "Breyaui",
    [
        { nombre: "La piel fria", autor: "Sanchez Piñol" },
        { nombre: "El aleph", autor: "J.L. Borges" },
        { nombre: "libro", autor: "autor" }
    ],
    ["Pipi", "Roque", "chichi"]);

usuario1.getFullName();
usuario1.addMascota("Marga")
usuario1.countMascotas();
usuario1.addBook("Eneida", "Virgilio");
usuario1.getBook();