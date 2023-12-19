'use strict';

const express = require('express');
const path = require('node:path');

const app = express();

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3001, () => {
  console.log('Server listening on port 3000');
});
