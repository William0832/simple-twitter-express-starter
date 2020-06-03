const chatController = require('./chat')


module.exports = (io) => {

  let connectedUser = {

  }

  io.on('connection', (socket) => {
    console.log('soket id :', socket.id)
    console.log('session:', socket.request.session)

    io.clients((error, clients) => {
      if (error) throw error;
      console.log(clients);
    })

    socket.on('login', (userName) => {
      console.log('login', userName)
      if (!connectedUser[userName]) {
        connectedUser[userName] = [socket.id]
      }
      else {
        connectedUser[userName].push(socket.id)
      }
      console.log(connectedUser)
    })

    socket.on('logout', (userName) => {
      console.log('logout', userName)
      if (!connectedUser[userName]) {
        return
      }
      else {
        connectedUser[userName] = connectedUser[userName].filter(id => id !== socket.id)
      }
      console.log(connectedUser)
    })

    chatController(io, socket)
  });

}
