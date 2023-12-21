const socketio = require('socket.io');

module.exports = (server) => {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('New client connection with id ' + socket.id);

    socket.on('new-message', (message) => {
      // reenviar el mensaje a todos los sockets conectados
      io.emit('mensaje-desde-el-servidor', message);
    });

    const interval = setInterval(() => {
      socket.emit('noticia', 'noticia numero: ' + Date.now());
    }, 2000);
  });
};
