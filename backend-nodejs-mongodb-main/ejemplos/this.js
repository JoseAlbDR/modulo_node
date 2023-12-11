'use strict';

// crear una funciónm para usarla como constructor de objetos
function Fruta(nombre) {
  this.nombre = nombre;
  this.saluda = function() {
    console.log('Hola soy', this.nombre);
  }
}

const limon = new Fruta('limon');

// limon.saluda();

// setTimeout(limon.saluda.bind(limon), 2000);

// const saludoDelLimon = limon.saluda.bind(limon);
const saludoDelLimon = limon.saluda;
// saludoDelLimon();
saludoDelLimon.call(limon, 'hola', 'que', 'tal')
saludoDelLimon.apply(limon, ['hola', 'que', 'tal'])

// JS busca el punto a la izquierda de los paréntesis de ejecución
// y lo que haya a la izquierda de ese punto, lo usa como this