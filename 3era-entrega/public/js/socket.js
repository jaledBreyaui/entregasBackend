const socket = io().connect()

const btns = document.querySelectorAll('.btn-addToCart')

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const prodId = e.target.id
        console.log(prodId);
        socket.emit('id', prodId)
    })
})