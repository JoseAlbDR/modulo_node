// cargar la libreria http
const http = require('http');
const Chance = require('chance');

const chance = new Chance();

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`Wake up, ${chance.name()}`);
});

servidor.listen(3000, () => {
  console.log('Server listening on port 3000');
});
