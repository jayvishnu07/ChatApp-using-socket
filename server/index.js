const express = require('express')
const app = express()
const http = require('http')
const s = require('socket.io')
const cors = require('cors')

app.use(cors());
server = http.createServer(app);

const io = new s.Server(server,{
    cors : 'http://localhost:3000'
})

io.on('connection', (socket)=>{
    console.log(`user id : ${socket.id}`);
    socket.on('join_room',(data)=>{
        socket.join(data)
        console.log(`${socket.id} is connected with ${data}`);
    })
    socket.on('send_message',(data)=>{
        console.log(data);
        socket.to(data.roomId).emit('receive_message',data);
    })
})

server.listen('8080',()=>{console.log("server started...")})