'use strict';

function sleep(ms, str) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(str);
      // reject({ message: 'Errrrrrrrrrooooooooor' });
    }, ms);
  });
}

// const promesa = sleep(3000);

// console.log(promesa);

// promesa
//   .then((result) => {
//     return sleep(2000);
//   })
//   .then(() => {
//     console.log('han pasado otros 2 segundos');
//   })
//   .catch((err) => console.log('Hubo un error:', err.message));

Promise.all([sleep(3000, '1'), sleep(1000, '2'), sleep(2000, '3')])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));

Promise.race([sleep(3000, '1'), sleep(1000, '2'), sleep(2000, '3')])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));
