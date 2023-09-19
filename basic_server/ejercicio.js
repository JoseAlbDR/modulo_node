'use strict';
const funcionAsincrona = (arr, callback, n = 0) => {
  if (n < arr.length) {
    setTimeout(() => {
      console.log(arr[n]);
      funcionAsincrona(arr, callback, n + 1);
    }, 2000);
  } else {
    callback();
  }
};

// funcionAsincrona([1, 2, 3, 'cuatro', 5], () => () => console.log('Fin'));

function Fruta(nombre) {
  this.nombre = nombre;
  this.saluda = function () {
    console.log('Hola soy', this.nombre);
  };
}

const limon = new Fruta('limon');

// setTimeout(limon.saluda.bind(limon), 2000);

const creaSumador = (numero) => {
  const cache = {};
  return (otroNumero) => {
    if (Object.keys(cache).includes(otroNumero + '')) {
      console.log('Cache');
      return cache[otroNumero];
    } else {
      console.log('Operacion');
      cache[otroNumero] = numero + otroNumero;
      return cache[otroNumero];
    }
  };
};

const creaSumador7 = creaSumador(7);
creaSumador7(1);
creaSumador7(3);
creaSumador7(1);
creaSumador7(2);
creaSumador7(2);
creaSumador7(3);
