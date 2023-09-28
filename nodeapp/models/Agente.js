const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, index: true },
    age: { type: Number, index: true },
  },
  { timestamps: true }
);

agentSchema.statics.lista = function (filtro, skip, limit, sort, fields) {
  const query = Agente.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
};

const Agente = mongoose.model('Agente', agentSchema);

module.exports = Agente;
