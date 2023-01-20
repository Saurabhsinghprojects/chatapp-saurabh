const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

// here we are asking the name of the user who is about to join the chat
const name = prompt('Please enter you name')
appendMessage('You joined the chat')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

// when user is connected
socket.on('user-connected', name => {
  appendMessage(`${name} joined the chat`)
})

// when user is disconnected
socket.on('user-disconnected', name => {
  appendMessage(`${name} left the chat`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}