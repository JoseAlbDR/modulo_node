const express = require('express');
const Agente = require('../../models/Agente');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const agentes = await Agente.find({});

    res.status(200).json({ agentes });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const agente = await Agente.findById(id);

    res.status(200).json({ agente });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const agente = await Agente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ agente });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newAgent = await Agente.create(req.body);

    res.status(200).json({ agent: newAgent });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Agente.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ messag: 'Agent not found' });
    }

    res.status(200).json({ message: 'Success!!!!!!!!' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
