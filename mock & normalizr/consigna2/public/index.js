const socket = io().connect()


const enviar = document.querySelector('.btn')
const mensajear = document.querySelector('#chatear')

const renderChat = (mensajes) => {
    let chat = document.querySelector('.listado-chat')
    let html = mensajes.map(msj => {
        return `<li class="row  border-bottom align-text-bottom">
            <p class="m-0 p-1"><strong>${msj.nombre.nombre}</strong> : ${msj.msj} </p>
        </li>`
    })

    chat.innerHTML = html.join(' ')
}

mensajear.addEventListener('click', () => {
    const nombre = document.querySelector('#nombre').value
    const msj = document.querySelector('#mensaje').value
    const email = document.querySelector('#email').value
    const edad = document.querySelector('#edad').value
    const avatar = document.querySelector('#avatar').value
    const obj = {
        nombre: {
            nombre,
            email,
            edad,
            avatar
        }, msj
    }
    socket.emit('new-message', obj)
    return false
})

socket.on('chat-server', data => {
    console.log(data);
    renderChat(data)
})