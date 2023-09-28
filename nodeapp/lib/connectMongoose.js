const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cursonode');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};

dbConnect();

module.exports = mongoose.connection;

// exports = dbConnect;

// mongoose.connection.on('error', (err) => console.log('Error de conexion', err));

// mongoose.connection.once('connected', () =>
//   console.log('Connected to MongoDb')
// );

// mongoose.connect('mongodb://localhost:27017/cursonode');
