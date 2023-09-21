var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals.texto = 'Hola';
  res.locals.nombre = "<script>alert('inyeccion de codigo js')</script>";

  const ahora = new Date();
  res.locals.esPar = ahora.getSeconds() % 2 === 0;
  res.locals.segundoActual = ahora.getSeconds();

  res.locals.usuarios = [
    { nombre: 'Smith', edad: 32 },
    { nombre: 'Jones', edad: 27 },
  ];

  res.render('index', { title: 'Express' });
});

// param
router.get('/parametro_en_ruta/:numero', (req, res) => {
  const { numero } = req.params;

  res.send(`he recibido el número: ${numero}`);
});

// opcional
router.get('/parametro_opcional/:numero?', (req, res) => {
  res.send(req.params.numero);
});

// varios
router.get('/producto/:nombre/talla/:talla/color/:color', (req, res) => {
  const { nombre, talla, color } = req.params;

  res.send(`Nombre: ${nombre}, talla: ${talla}, color: ${color}`);
});

module.exports = router;
