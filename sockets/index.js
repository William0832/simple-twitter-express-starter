const chatController = require('./chat')


module.exports = (io) => {

  let connectedUser = {

  }

  const cleanUnconnectedSokcetId = function (username) {
    connectedUser[username].forEach((id, index, object) => {
      if (!io.sockets.connected[id]) {
        object.splice(index, 1) //remove unconnected socketId
      }
    })
  }

  io.on('connection', (socket) => {
    console.log('soket id :', socket.id)
    // console.log('session:', socket.request.session)

    io.clients((error, clients) => {
      if (error) throw error;
      console.log(clients);
    })

    socket.on('login', (userId) => {
      console.log('login', userId)
      if (!connectedUser[userId]) {
        connectedUser[userId] = [socket.id]
      }
      else {
        connectedUser[userId].push(socket.id)
      }

      cleanUnconnectedSokcetId(userId)
      console.log(connectedUser)
    })

    socket.on('logout', (userId) => {
      console.log('logout', userId)
      if (!connectedUser[userId]) {
        return
      }
      else {
        connectedUser[userId] = connectedUser[userId].filter(id => id !== socket.id)
      }
      console.log(connectedUser)
    })


    socket.on('chat', (payload) => {
      const { msg, room } = payload
      console.log(socket.id, 'chat:', msg)
      io.to(room).emit('chat', msg);
    });

    socket.on('invite', (payload) => {
      const { user, room } = payload
      console.log('id', connectedUser[user])
      socket.join(room)
      if (connectedUser[user]) {
        connectedUser[user].forEach((id, index, object) => {
          if (io.sockets.connected[id]) {
            io.sockets.connected[id].join(room)
          } else {
            object.splice(index, 1) //remove unconnected socketId
          }
          console.log('id', connectedUser[user])
        })
      }
    });

    // chatController(io, socket)
  });

}
