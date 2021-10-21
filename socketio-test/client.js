const socket = io();

const btn = document.querySelector('button');
const inputName = document.querySelector('input');

socket.on('hello', (data) => {
    console.log(data);
})
btn.addEventListener('click', (e) => {
    var name = inputName.value;
    var users =
    socket.emit('click-btn', {'name': name})
})