const socket = io().connect()

const enviar = document.querySelector('.btn')
const mensajear = document.querySelector('#chatear')

const render = (productos) => {
    let listado = document.querySelector('.listado')
    let html = productos.map(prod => {
        return `<li class="row">
        <h4 class="col-3 m-2">Nombre:   ${prod.nombre} </h4>
        <h4 class="col-3 m-2">Precio:   ${prod.precio} </h5>
        </li>`
    })

    listado.innerHTML = html.join(' ')
}

const renderChat = (mensajes) => {
    let chat = document.querySelector('.listado-chat')
    let html = mensajes.map(msj => {
        return `<li class="row">
            <p><strong>${msj.nombre}</strong> : ${msj.msj} </p>
        </li>`
    })

    chat.innerHTML = html.join(' ')
}


enviar.addEventListener('click', () => {
    const nombre = document.querySelector('#producto').value
    const precio = document.querySelector('#precio').value
    const producto = { nombre, precio }
    socket.emit('nuevo-producto', producto)
    return false
})

mensajear.addEventListener('click', () => {
    const nombre = document.querySelector('#nombre').value
    const msj = document.querySelector('#mensaje').value
    const obj = { nombre, msj }
    socket.emit('nuevo-mensaje', obj)
    return false
})



socket.on('mensaje-server', data => {
    render(data);
})

socket.on('chat-server', data => {
    renderChat(data)
})

