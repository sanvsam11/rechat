import './App.css';
import { useState } from 'react';
import Message from './modules/Message'
import socketClient from "socket.io-client"




function App() {
  const socket = socketClient("http://127.0.0.1:8080")
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const handleChange = e => setMessage(e.target.value)
  const handleSend = (e)=>{
    e.preventDefault()
    if(message){
        console.log('emitting:'+message)
        socket.emit('chat message', message)
        setMessage('')
    }
  }
  socket.on('chat message', function(msg){
    console.log('incoming:'+msg)
    setMessages(messages=>[...messages, {text: msg}])
    console.log('messages:'+messages)
    window.scrollTo(0, document.body.scrollHeight)
  })
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <ul id='messages'>
          {messages.map((msg)=><Message message={msg}/>)}
        </ul>
        <form id="form" action="" onSubmit={handleSend} >
            <input id="input" autoComplete="off" onChange={handleChange}/><button>Send</button>
        </form>
      </main>
    </div>
  );
}

export default App;
