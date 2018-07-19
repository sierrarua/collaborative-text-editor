import http from 'http'
import express from 'express'
import socketIO from 'socket.io'
import {auth, document} from './socket-api'
import routes from './routes'

const app = express()
const server = http.Server(app)
const io = socketIO(server)

io.on('connection', function (socket) {
  document(socket)
  auth(socket)
})

app.use(routes)

server.listen(1337, '127.0.0.1');

server.listen(process.env.PORT || 1337)
