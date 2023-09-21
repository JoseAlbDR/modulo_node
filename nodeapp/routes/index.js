var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals.texto = 'Hola';
  res.locals.nombre = "<script>alert('inyeccion de codigo js')</script>";

  const ahora = new Date();
  res.locals.esPar = ahora.getSeconds() % 2 === 0;
  res.locals.segundoActual = ahora.getSeconds();

  res.render('index', { title: 'Express' });
});

module.exports = router;
