const express = require('express');
const Agente = require('../../models/Agente');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const agentes = await Agente.find({});

    res.status(200).json({ agentes });
  } catch (error) {
    next(err);
  }
});

module.exports = router;
