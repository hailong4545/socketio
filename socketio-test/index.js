const express = require('express')
const app = express();

const server = require("http").createServer(app);
const { Server } = require('socket.io')

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    return;
})

app.get('/room', (req, res) => {
    let idRoom = req.query;
    console.log(idRoom);
    res.redirect(`/room/${idRoom.nameRoom}`);
})

app.get('/room/:nameRoom', (req, res) => {
    let nameRoom = req.params.nameRoom;
    res.sendFile(__dirname + '/room.html');
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('creat-room', (data) => {
        console.log('123');
        console.log(socket.id);
        console.log(socket.rooms);
        console.log('hihi');
        socket.emit('redirt', 'http://localhost:3000/room/'+data);
    });
    socket.on('room-new-message', (data) => {
        io.sockets.in(data[1]).emit('show-new-message', data[0]);
    });

    socket.on('join-room', (data) => {
        socket.join(data);
        console.log(socket.rooms);
        socket.emit('join-room-suss', data);
    })
})


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listen ${port}`));
