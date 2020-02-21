const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')
const app = express()

mongoose.connect('mongodb+srv://larissa:larissa@cluster0-77izn.mongodb.net/teste?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//req.query = query params (filtros)
//req.params = route params (edição, delete)
//req.body- corpo da requisição

app.use(cors())
app.use(express.json())

app.use('/files/', express.static(path.resolve(__dirname, '..','uploads')))

app.use(routes)

app.listen(3333)
