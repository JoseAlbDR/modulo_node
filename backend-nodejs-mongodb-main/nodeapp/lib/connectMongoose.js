const mongoose = require('mongoose');

mongoose.connection.on('error', (err) => {
  console.log('Error de conexión', err);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://mongo-user:123456@localhost:27017/');

module.exports = mongoose.connection;
