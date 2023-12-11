'use strict';

const axios = require('axios');

main().catch(err => console.log('Hubo un error', err));

async function main() {

  // const response = await axios.get('https://swapi.dev/api/people?page=2')
  const response = await axios.get('http://127.0.0.1:3000/api/agentes')

  console.log(response.data);

}