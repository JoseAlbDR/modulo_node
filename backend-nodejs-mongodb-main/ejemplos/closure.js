'use strict';

function creaSumador(numero) {
  // este contexto es accesible SIEMPRE
  // por la función que estamos devolviendo
  const nombre = 'Luis';
  return function(otroNumero) {
    return numero + otroNumero + nombre;
  }
}

const sumaSiete = creaSumador(7);

console.log(sumaSiete(10));

function creaVehiculo(nombre) {
  // contexto del closure
  return {
    getNombre: function() { return nombre; },
    setNombre: function(valor) { nombre = valor; },
    saluda: function() { console.log('Hola soy', nombre)}
  }
}

const coche = creaVehiculo('Seat')

coche.saluda()

setTimeout(coche.saluda, 2000);

const saludoDelCoche = coche.saluda;
saludoDelCoche();