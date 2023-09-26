const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  { timestamps: true }
);

const Agente = mongoose.model('Agente', agentSchema);

module.exports = Agente;
