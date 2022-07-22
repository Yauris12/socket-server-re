const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const cors = require('cors')
const Sockets = require('./sockets')
class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //HTTP SERVER
    this.server = http.createServer(this.app)
    //Configuration sockets

    //config del socket server
    this.io = socketio(this.server, {
      // configuracions
    })
  }

  middlewares() {
    //directorio public
    this.app.use(express.static(path.resolve(__dirname, '../public')))
    this.app.use(cors())
  }
  configuracionSockets() {
    new Sockets(this.io)
  }
  execute() {
    this.middlewares()

    //inicializar socketio
    this.configuracionSockets()

    this.server.listen(this.port, () => {
      console.log('server corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
