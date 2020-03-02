const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
//pega o servidor http e extraindo ele do express
const server = http.Server(app)
//'ouve' os usuarios conectados
const io = socketio(server)

// console.log(io)
mongoose.connect('mongodb+srv://larissa:larissa@cluster0-77izn.mongodb.net/teste?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUsers = {}

io.on('connection', socket => {
    const { user_id } = socket.handshake.query
    //usa-se [] para retornar o valor da id ao inves de user_id
    connectedUsers[user_id] = socket.id
})
//next função para continuar o fluxo da aplicação
app.use((req, res, next)=> {
    //deixar disponivel para todas as rotas
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})


//req.query = query params (filtros)
//req.params = route params (edição, delete)
//req.body- corpo da requisição

app.use(cors())
app.use(express.json())

app.use('/files/', express.static(path.resolve(__dirname, '..','uploads')))

app.use(routes)

//app.listen(3333)
server.listen(3333)
