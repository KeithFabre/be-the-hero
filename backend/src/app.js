const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate')
const routes = require('./routes')
const app = express() //importante para express entender json das reqs

//cors define que endereço pode acessar o backend, importante quando projeto entra em produção
app.use(cors()) 
app.use(express.json())
app.use(routes)
app.use(errors()) //msg de erro mais amigável 

module.exports = app 