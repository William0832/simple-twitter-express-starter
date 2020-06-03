const chatController = require('./chat')


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('soket id :', socket.id)
    chatController(io, socket)
  });
}
