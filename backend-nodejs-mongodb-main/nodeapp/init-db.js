'use strict';

const readline = require('node:readline');
const connection = require('./lib/connectMongoose');
const Agente = require('./models/Agente');
const initData = require('./init-db-data.json');

main().catch(err => console.log('Hubo un error', err));

async function main() {

  // espero a que se conecte a la base de datos
  await new Promise(resolve => connection.once('open', resolve))

  const borrar = await pregunta(
    'Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?'
  )
  if (!borrar) {
    process.exit();
  }

  // inicializar la colección de agentes
  await initAgentes();

  connection.close();
}

async function initAgentes() {
  // borrar todos los documentos de la colección de agentes
  const deleted = await Agente.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} agentes.`);

  // crear agentes iniciales
  const inserted = await Agente.insertMany(initData.agentes);
  console.log(`Creados ${inserted.length} agentes.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(texto, respuesta => {
      ifc.close();
      resolve(respuesta.toLowerCase() === 'si');
    })
  });
}