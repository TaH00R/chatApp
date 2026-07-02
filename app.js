const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server)
io.on('connection' , onConnected)
const connectedSocket = new Set()
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
     console.log("Trying to join:", data.room);
    console.log("Rooms:", [...connectedSocket]);
    if(!connectedSocket.has(data.room)) {
      
      socket.emit('no-room' , data.room)
      return
    } 
      socket.emit('room-joined' , data)
      
    })
    socket.on('create-room' , (data)=>{
      connectedSocket.add(data.room)

    console.log("Created:", data.room);
    console.log([...connectedSocket]);
      socket.emit('room-created' , data); 
    })
    socket.on('enter-room' , (data)=>{
    socket.join(data.room)
    socket.room = data.room;
     const roomSize = io.sockets.adapter.rooms.get(data.room)?.size || 0
    io.to(data.room).emit("total-clients" , roomSize)

  })
}
app.get('/' , (req , res)=>{
  res.sendFile(path.join(__dirname , "public" , "home.html"))
})

app.use(express.static(path.join(__dirname , 'public')));
server.listen(3000 ,"0.0.0.0", ()=>{
  console.log("server running...")
})