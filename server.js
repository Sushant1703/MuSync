const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('sync', (data) => {
        socket.broadcast.emit('sync', data); // Broadcast sync data to other clients
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});