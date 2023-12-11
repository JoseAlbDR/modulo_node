var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.locals.texto = 'Hola';
  res.locals.nombre = '<script>alert("inyección de código")</script>'

  const ahora = new Date();
  res.locals.esPar = (ahora.getSeconds() % 2) === 0;
  res.locals.segundoActual = ahora.getSeconds();

  res.locals.usuarios = [
    { nombre: 'Smith', edad: 32 },
    { nombre: 'Jones', edad: 27 }
  ]

  res.render('index');
});

// GET /parametro_en_ruta/66
router.get('/parametro_en_ruta/:numero', (req, res, next) => {
  const numero = req.params.numero;

  res.send('he recibido el número: ' + numero);
});

// GET /parametro_opcional/66
router.get('/parametro_opcional/:numero?', (req, res, next) => {
  const numero = req.params.numero;

  res.send('(opcional) he recibido el número: ' + numero);
});

// GET /producto/pantalones/talla/34/color/azul
router.get('/producto/:nombre/talla/:talla([0-9]+)/color/:color', (req, res, next) => {
  console.log(req.params)

  // const nombre = req.params.nombre;
  // const talla = req.params.talla;
  // const color = req.params.color;
  const { nombre, talla, color } = req.params;

  res.send(`Me pediste ${nombre} talla ${talla} color ${color}`);
});


module.exports = router;
