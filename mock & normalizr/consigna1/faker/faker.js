import faker from '@faker-js/faker'
faker.locale = 'es'



function generarProductos() {
    return {
        prods: faker.faker.commerce.product()
    }
}



export { generarProductos }



