'use strict';

import EventEmitter from 'events';

const emisor = new EventEmitter();

emisor.on('llamada de telefono', () => {
  console.log('ring ring');
});

emisor.once('llamada de telefono', () => {
  console.log('brr brr');
});

emisor.emit('llamada de telefono');
emisor.emit('llamada de telefono');
emisor.emit('llamada de telefono');
emisor.emit('llamada de telefono');

function Persona(nombre) {
  //...
}

const pepe = new Persona();

Object.setPrototypeOf(Persona.prototype, EventEmitter.prototype);

pepe.on('hola', () => {
  console.log('Hola que pasa');
});

pepe.emit('hola');
