module.exports = (io, socket) => {


  // socket.on('login', (user) => {
  //   // console.log('user:', user)
  //   users[user] = socket.id
  //   // console.log(users)
  // })

  socket.on('chat', (msg) => {
    console.log(socket.id, 'chat:', msg)
    io.to('chatRoom').emit('chat', msg);
  });

  socket.on('invite', (user) => {
    console.log(socket.id, 'chat:', msg)
    io.sockets.connected['8ZFg8S_xwIPW1mpCAAAC'].join('chatRoom')
  });
}