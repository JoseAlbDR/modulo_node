const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Agente = mongoose.model('Agente', agentSchema);

module.exports = Agente;
