const socket = io()
const totalOnline = document.getElementById('active-clients')
const messageContainer = document.getElementById('message-container')
const userName = document.getElementById('user-name')
const messageForm = document.getElementById('form-message')
const messageInput = document.getElementById('input-message')

const params = new URLSearchParams(window.location.search)
const room = params.get("room")
const name = params.get("name")

socket.emit('enter-room' , {
  room,
  name
})
userName.value = name
messageForm.addEventListener('submit' , (e)=>{
   e.preventDefault()
   sendMessage();
})


socket.on('total-clients' , (data)=>{
  totalOnline.innerText = `Total Online: ${data}`
})

function sendMessage() {
  if(messageInput.value === '') return
  if(userName.value ==='') {
    alert("enter your name")
    return
  }
  console.log(messageInput)
  const data = {
    name:userName.value,
    message: messageInput.value,
    dateTime: new Date()
  }
  socket.emit('message' , data)
  addMessage(true , data)
  messageInput.value = "";
}

socket.on('chat-message' , (data)=>{
  
  addMessage(false , data);

})
function addMessage(isOwnMessage , data) {
  const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
        <p class="message">
          ${data.message}
          <span>${data.name} * ${moment(data.dateTime).fromNow()} 
          </span>
        </p>
      </li>
  `
  messageContainer.innerHTML += element
  scrollToBottom()
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}
let typingTimeout;
const typingUsers = new Set();
messageInput.addEventListener('input' , (e)=>{
  socket.emit('feedback' , {
    name: userName.value
  })
  clearTimeout(typingTimeout)
typingTimeout = setTimeout(()=>{
  socket.emit('stop-feedback' , {
    name:userName.value
  })
} , 1000);
})

socket.on('stop-feedback' , (data)=>{
  typingUsers.delete(data.name)
  updateFeedback();
})
socket.on("feedback" , (data)=>{
  typingUsers.add(data.name)
  updateFeedback();
})
function updateFeedback() {
  const feedbackDisplay = document.getElementById('feedback')
  if(typingUsers.size===0) {
    feedbackDisplay.textContent = "";
  }
  else {
  feedbackDisplay.textContent = [...typingUsers].join(',')+' is typing...'
  }
}