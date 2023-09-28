'use strict';

const readLine = require('node:readline/promises');
const connection = require('./lib/connectMongoose');
const Agente = require('./models/Agente');

const question = async (text) => {
  // conectar con la consola
  const inter = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const response = await inter.question(text);
    return response === 'si';
  } catch (error) {
    console.error(error);
  } finally {
    inter.close();
  }
};

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
  // espero a que conecte a la base de datos
  await new Promise((resolve) => connection.once('open', resolve));

  const borrar = await question(
    'Are you sure you want to wipe and repopulate it?\n'
  );

  console.log(borrar);

  if (!borrar) {
    process.exit();
  }

  try {
    //inicializar la coleccion de agentes
    await initAgentes();

    connection.close();
  } catch (error) {
    console.log('Hubo un error', error);
  }
};

main();
