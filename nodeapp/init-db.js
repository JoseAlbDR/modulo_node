'use strict';

const connection = require('./lib/connectMongoose');
const Agente = require('./models/Agente');

const initAgentes = async () => {
  try {
    // borrar todos los documentos de la coleccion de agentes
    const deleted = await Agente.deleteMany({});
    console.log(`Eliminados ${deleted.deletedCount} agentes`);
    const inserted = await Agente.insertMany([
      {
        name: 'Smith',
        age: 33,
      },
      {
        name: 'Jones',
        age: 23,
      },
      {
        name: 'Brown',
        age: 46,
      },
    ]);

    console.log(`Created ${inserted.length} agentes`);
  } catch (error) {
    console.log('error init agentes', error);
  }
};

const main = async () => {
  try {
    //inicializar la coleccion de agentes
    await initAgentes();

    connection.close();
  } catch (error) {
    console.log('Hubo un error', error);
  }
};

main();
