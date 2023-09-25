var express = require('express');
var router = express.Router();
const { query, validationResult } = require('express-validator');

/* GET users listing. */
router.get(
  '/',
  [
    // validaciones
    query('age')
      .isEmpty()
      .withMessage('age is required')
      .isNumeric()
      .withMessage('age must be a number'),
  ],
  function (req, res, next) {
    validationResult(req).throw();

    const usuarios = [
      { nombre: 'Smith', edad: 32 },
      { nombre: 'Jones', edad: 27 },
    ];

    const user = usuarios.filter((user) => user.nombre === req.query.nombre);

    res.json(user);
  }
);

// post /users/5 (body)
router.post('/', (req, res) => {
  res.json({ user: req.body });
});

module.exports = router;
