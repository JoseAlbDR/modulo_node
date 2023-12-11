'use strict';

// cargar la librería de express
const express = require('express');

// crear la aplicación
const app = express();

// añadir una ruta
app.get('/', (request, response, next) => {
  response.send('Hola');
});

app.get('/facturas', (request, response, next) => {
  response.send({ result: [ 1, 2, 3]});
});

// arrancamos el servidor
app.listen(8000, () =>  {
  console.log('Servidor HTTP arrancado en http://127.0.0.1:8000');
})