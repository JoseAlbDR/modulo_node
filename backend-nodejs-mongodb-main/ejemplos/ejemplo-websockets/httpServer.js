'use strict';

const express = require('express');
const path = require('node:path');
const http = require('http');
const webSocketsServer = require('./webSocketsServer');

const app = express();

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);

server.listen(3001, () => {
  console.log('Server listening on port 3000');
});

webSocketsServer(server);
