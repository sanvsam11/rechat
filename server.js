const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

io.on('connection', (socket)=>{
    console.log('a user connected')
    io.on('send message', (msg)=>{
        console.log('got:'+msg)
        io.emit('chat message', msg )
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})


app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', function(req, res){ 
    return res.send('pong')
})

// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname, 'src', 'index.js'))
// })

server.listen(process.env.PORT || 8080, ()=>{
    console.log('server listening on 8080')
})