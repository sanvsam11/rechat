import './App.css';
import React, { useState, useRef } from 'react';
import Messages from './modules/Messages'
import socketClient from "socket.io-client"

function App() {
  const socket = socketClient("http://127.0.0.1:8080")
  const [messages, setMessages] = useState([])
  const inputRef = useRef(null)
  const handleSend = () => {
    const msg = inputRef.current.value
    socket.emit('send message', msg)
  }
  socket.on('chat message', (msg)=>{
    setMessages(oldmessages=>[...oldmessages, msg])
  })
  return(
    <div>
        <Messages Messages={messages} /> 
        <form id="form" onSubmit={()=>handleSend()}>
            <input id="input" autoComplete="off" ref={inputRef} /><button>Send</button>
        </form>
    </div>
  )
}

export default App;
