const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const connectedSocket = new Set()
io.on('connection' , onConnected)
let socketsConnected = new Set();
function onConnected(socket) {
  console.log(socket.id);
  socketsConnected.add(socket.id)

  // io.to(socket.room).emit('total-clients' , socketsConnected.size)
  
  socket.on('disconnect' , ()=>{
    console.log("socket disconnected" , socket.id)
    socketsConnected.delete(socket.id)
    io.emit('total-clients' , socketsConnected.size)
  })
  socket.on('message' , (data)=>{
    socket.to(socket.room).emit('chat-message' , data)
    
  })
  socket.on('feedback' , (data)=>{
    socket.to(socket.room).emit("feedback" , data);
  
  })
  socket.on('stop-feedback' , (data)=>{
    socket.to(socket.room).emit('stop-feedback' , data)
  })
  socket.on("join-room" , (data)=>{
    if(!io.sockets.adapter.rooms.has(socket.room)) {
      
      socket.emit('no-room' , data.room)
      return
    } 
      socket.join(data.room)
      socket.room = data.room;
       const roomSize = io.sockets.adapter.rooms.get(data.room)?.size || 0
      io.to(data.room).emit("total-clients" , roomSize)
    
  })
  socket.on('create-room' , (data)=>{
     socket.join(data.room)
      socket.room = data.room;
       const roomSize = io.sockets.adapter.rooms.get(data.room)?.size || 0
      io.to(data.room).emit("total-clients" , roomSize)
  })
}


app.use(express.static(path.join(__dirname , 'public')));
server.listen(3000 ,"0.0.0.0", ()=>{
  console.log("server running...")
})