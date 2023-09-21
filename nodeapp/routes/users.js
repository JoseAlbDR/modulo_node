var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const usuarios = [
    { nombre: 'Smith', edad: 32 },
    { nombre: 'Jones', edad: 27 },
  ];

  const user = usuarios.filter((user) => user.nombre === req.query.nombre);

  res.json(user);
});

module.exports = router;
