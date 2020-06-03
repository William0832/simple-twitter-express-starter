module.exports = (io, socket) => {


  // socket.on('login', (user) => {
  //   // console.log('user:', user)
  //   users[user] = socket.id
  //   // console.log(users)
  // })

  socket.on('chat', (msg) => {
    console.log(socket.id, 'chat:', msg)
    io.emit('chat', msg);
  });
}