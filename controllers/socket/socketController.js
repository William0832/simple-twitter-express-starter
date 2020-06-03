module.exports = (io, socket) => {

  socket.on('chat', (msg) => {
    console.log('chat:', msg)
    io.emit('chat', msg);
  });
}