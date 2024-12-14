import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './community.css'

const Community = () => {
  const [message, setMessage] = useState('') // Message input field state
  const [messages, setMessages] = useState([]) // State for storing all chat messages
  const [socket, setSocket] = useState(null) // Socket connection state

  // Establish socket connection when the component mounts
  useEffect(() => {
    const socketConnection = io('http://localhost:3000') // Connect to the server
    setSocket(socketConnection) // Store the socket connection

    // Listen for incoming messages
    socketConnection.on('receiveMessage', (newMessage) => {
      console.log('Received message:', newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]) // Append the new message to the message list
    })

    // Cleanup: Disconnect socket when the component unmounts
    return () => {
      socketConnection.disconnect()
    }
  }, [])

  // Handle message input change
  const handleInputChange = (e) => {
    setMessage(e.target.value) // Update message state
  }

  // Handle sending message
  const sendMessage = () => {
    // Retrieve the stored user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'))

    const username = user ? user.username : null

    if (message.trim() && username) {
      // Format the message as "username: message"
      const formattedMessage = `${username}: ${message}`

      // Emit the formatted message to the server
      socket.emit('sendMessage', formattedMessage)

      // Clear the input field after sending
      setMessage('')
    } else {
      console.log('Message or username is missing')
    }
  }

  // Handle sending message when Enter is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      sendMessage()
    }
  }

  return (
    <>
      <div className="community-chat">
        <h2>COMMUNITY CHAT</h2>
        {/* Display messages in the textarea */}
        <textarea
          value={messages.join('\n')} // Display all messages in the textarea
          readOnly
          rows={10}
          cols={30}
        />
        <div className="community-input">
          <input
            type="text"
            placeholder="Type your message here.."
            value={message} // Bind input field value to state
            onChange={handleInputChange} // Update the state on input change
            onKeyDown={handleKeyPress} // Send message on Enter key press
          />
          <button onClick={sendMessage} className="community-button">
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default Community
