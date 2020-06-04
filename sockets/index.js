const chatController = require('./chat')
const chatService = require('../services/chatServices')
const notificationService = require('../services/notificationServices')


module.exports = (io) => {

  let connectedUser = {

  }

  let rooms = []

  const cleanUnconnectedSokcetId = function (username) {
    connectedUser[username].forEach((id, index, object) => {
      if (!io.sockets.connected[id]) {
        object.splice(index, 1) //remove unconnected socketId
      }
    })
  }

  const checkRooms = function (user, invitedUser) {

    // if (!rooms.length) {
    //   console.log('no room exist')
    //   rooms.push([user, invitedUser])
    //   return 0
    // }
    if (!invitedUser) {
      return null
    }

    const index = rooms.findIndex((room, index) => {
      console.log('user:', user, ', invitedUser:', invitedUser, ', room:', room)
      console.log(room.includes(user))
      console.log(room.includes(invitedUser))

      return (room.includes(user) && room.includes(invitedUser))

    })

    console.log('index', index)

    if (index === -1) {
      ('fisrt!')
      rooms.push([user, invitedUser])
      return rooms.length - 1
    }

    return index
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
      const { msg, user, invitedUser } = payload

      const room = checkRooms(user, invitedUser)
      console.log(socket.id, 'chat:', msg, 'room:', room)
      // io.to(room).emit('chat', msg);

      if (msg && room) {
        console.log('chat ok')
        io.to(room).emit('chat', msg)
      } else {
        console.log('chat NG')
      }

    });

    socket.on('invite', (invitation) => {
      const { user, invitedUser } = invitation
      console.log('id', socket.id, 'invite', invitedUser)
      let roomId = checkRooms(user, invitedUser)

      console.log(rooms, 'id', roomId)

      socket.join(roomId)

      if (connectedUser[invitedUser]) {
        connectedUser[invitedUser].forEach((id, index, object) => {
          if (io.sockets.connected[id]) {
            io.sockets.connected[id].join(roomId)
          } else {
            object.splice(index, 1) //remove unconnected socketId
          }
          console.log('id', connectedUser[invitedUser])
        })
      }


    });

    socket.on('reply', (payload) => {
      const { userId, tweetId, type } = payload
      console.log('reply notification')
      notificationService.postNotification(userId, tweetId, type)
    })

    // chatController(io, socket)
  });
}
