'use strict';

// función que devuelve una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(54);
      // reject(new Error('error fatal!'));
    }, ms)
  })
}

// const promesa = sleep(3000);

// console.log(promesa);

// promesa.then((resultado) => {
//   console.log('han pasado 3 segundos, con resultado', resultado);
//   return sleep(2000)
// }).then(() => {
//   console.log('han pasado otros 2 segundos');
// }).catch(err => {
//   console.log('Hubo un error:', err.message);
// });

Promise.all([sleep(3000), sleep(1000), sleep(2000)]).then(resultados => {
  console.log(resultados);
})