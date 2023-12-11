'use strict';

function Persona(nombre) {
  this.nombre = nombre;
  // this.saluda = function() { console.log('Hola soy', this.nombre); }
}

const pepe = new Persona('Pepe');
const luis = new Persona('Luis');

Persona.prototype.saluda = function() { console.log('Hola soy', this.nombre); }

pepe.saluda();
luis.saluda();

// Herencia simple --------------------------

function Agente(nombre) {
  // heredar el constructor de las personas
  // ejecutar el constructor de las personas con mi "this"
  Persona.call(this, nombre)
}

// heredar las propiedades de las personas
// Agente.prototype = Object.create(Persona.prototype);
// Agente.prototype.constructor = Agente;
Object.setPrototypeOf(Agente.prototype, Persona.prototype);

const smith = new Agente('Smith');

smith.saluda();

// Herencia múltiple ------------------

// Quiero que los agentes hereden tanto de las personas, como de los superheroes

function Superheroe() {
  this.vuela = function() { console.log(this.nombre, 'vuela'); }
}

// copiar todas las propiedades de los Superheroes al prototipo del Agente
Object.assign(Agente.prototype, new Superheroe());

smith.vuela();

console.log(smith);
console.log(Agente.prototype);
console.log(Persona.prototype);