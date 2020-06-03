module.exports = (io, socket) => {

  let users = {

  }


  socket.on('login', (user) => {
    console.log('user:', user)
    users[user] = socket.id
    console.log(users)
  })

  socket.on('chat', (msg) => {
    console.log('chat:', msg)
    io.emit('chat', msg);
  });
}