const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const Message = require('./model/message')
require('dotenv').config()
const connectDB = require('./config/db')
io.on("connection", onConnected);
const connectedSocket = new Set();
let socketsConnected = new Set();
const roomUsers = new Map();
function onConnected(socket) {
  console.log(socket.id);
  socketsConnected.add(socket.id);

  // io.to(socket.data.room).emit('total-clients' , socketsConnected.size)

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    socketsConnected.delete(socket.id);
    if (!socket.data.room) {
      return;
    }

    const users = roomUsers.get(socket.data.room);
    if (!users) {
      return;
    }
    const updatedArray = users.filter((user) => user.id !== socket.id);
    roomUsers.set(socket.data.room, updatedArray);
    io.to(socket.data.room).emit("room-users", updatedArray);
    io.emit("total-clients", socketsConnected.size);
  });
  socket.on("message", async (data) => {
    const newMessage = new Message({
      room:socket.data.room,
      sender: data.name,
      message:data.message

    })
    await newMessage.save()
    socket.to(socket.data.room).emit("chat-message", data);
  });
  socket.on("feedback", (data) => {
    socket.to(socket.data.room).emit("feedback", data);
  });
  socket.on("stop-feedback", (data) => {
    socket.to(socket.data.room).emit("stop-feedback", data);
  });
  socket.on("join-room", (data) => {
    console.log("Trying to join:", data.room);
    console.log("Rooms:", [...connectedSocket]);
    if (!connectedSocket.has(data.room)) {
      socket.emit("no-room", data.room);
      return;
    }
    if(!checkUniqueness(data)) {
    socket.emit("room-joined", data);
    } else {
      socket.emit("dublicateName" , data);
    }
  });
  socket.on("create-room", (data) => {
    connectedSocket.add(data.room);

    console.log("Created:", data.room);
    console.log([...connectedSocket]);
    socket.emit("room-created", data);
  });
  socket.on("enter-room", async (data) => {
    socket.join(data.room);
    socket.data.room = data.room;
    const roomSize = io.sockets.adapter.rooms.get(data.room)?.size || 0;
    io.to(data.room).emit("total-clients", roomSize);
    if (!roomUsers.get(data.room)) {
      roomUsers.set(data.room, []);
    }
    const users = roomUsers.get(data.room);
    users.push({
      id: socket.id,
      name: data.name,
    });

    io.to(data.room).emit("room-users", users);
    const message = await Message.find({
      room:data.room
    }).sort({createdAt:1})
    socket.emit('previous-messages' , message)
  });
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

function checkUniqueness(data) {
const users = roomUsers.get(data.room) ||[]
const usernameExist = users.some(user=>
  user.name === data.name
)
if(usernameExist) {
  return true;
} else{return false}
}

app.use(express.static(path.join(__dirname, "public")));
async function startServer() {
  await connectDB();
  server.listen(3000, "0.0.0.0", () => {
    console.log("server running...");
  });
}
startServer();
