const socket = io()
const createRoomBtn = document.getElementById('createRoom')
const joinRoomBtn = document.getElementById('joinRoom')
function genereateID() {
  return  Math.random().toString(36)
  .substring(2,8)
  .toUpperCase()
}  
socket.on('room-created' , (data)=>{
  window.location.href = `index.html?room=${data.room}&name=${data.name}`

})
socket.on('room-joined', (data)=>{

  window.location.href=`index.html?room=${data.room}&name=${data.name}`
})
socket.on("dublicateName" , (data)=>{
  alert("username already exist in room")
})
  socket.on('no-room' , (data)=>{
    alert("No room found")
  })
createRoomBtn.addEventListener('click' ,()=> {
  const Cusername = document.getElementById('create-username').value
  console.log("Button Clicked")
  const roomID = genereateID()
  socket.emit("create-room" ,{
    room:roomID,
    name:Cusername
})

})
joinRoomBtn.addEventListener('click' , ()=>{
  const Jusername = document.getElementById('join-username').value
  const roomId = document.getElementById('room-ID').value
 socket.emit("join-room" ,{
 room:roomId,
 name:Jusername
})


  })
