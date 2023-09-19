'use strict';

function Persona(nombre) {
  this.nombre = nombre;
  // this.saluda = function () {
  //   console.log(`Hola soy ${this.nombre}`);
  // };
}

Persona.prototype.saluda = function () {
  console.log(`Hola soy ${this.nombre}`);
};

const pepe = new Persona('Pepe');

console.log(pepe);
pepe.saluda();
console.log(Persona.prototype);
console.log(Object.getPrototypeOf(pepe));
console.log(Persona.prototype === Object.getPrototypeOf(pepe));

// Herencia simple
function Agente(nombre) {
  // heredar el constructor
  // heredar las propiedades de las personas

  Persona.call(this, nombre);
}

// Agente.prototype = Object.create(Persona.prototype);
// Agente.prototype.constructor = Agente;

Object.setPrototypeOf(Agente.prototype, Persona.prototype);

const smith = new Agente('Smith');

// Herencia multiple
function Superheroe() {
  this.vuela = function () {
    console.log(this.nombre, 'vuela');
  };
}

// copiar todas las propiedades de los Superheroes al prototipo del Agente
Object.assign(Agente.prototype, new Superheroe());

smith.saluda();
smith.vuela();

console.log(smith);
console.log(Agente.prototype);
console.log(Persona.prototype);
console.log(Object.getPrototypeOf(smith));
