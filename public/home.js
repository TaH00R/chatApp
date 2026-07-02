const socket = io()
const createRoomBtn = document.getElementById('createRoom')
const joinRoomBtn = document.getElementById('joinRoom')
function genereateID() {
  return  Math.random().toString(36)
  .substring(2,8)
  .toUpperCase()
}  
createRoomBtn.addEventListener('click' ,()=> {
  console.log("Button Clicked")
  const roomID = genereateID()
  
  const username = document.getElementById('create-username').value
  window.location.href = `index.html?room=${roomID}&name=${username}`
})
joinRoomBtn.addEventListener('click' , ()=>{
  const roomId = document.getElementById('room-ID').value
 
      const username = document.getElementById('join-username').value
      window.location.href=`index.html?room=${roomId}&name=${username}`
  
  })
