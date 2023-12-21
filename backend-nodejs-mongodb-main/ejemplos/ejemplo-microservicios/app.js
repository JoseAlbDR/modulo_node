'use strict';

const { Requester } = require('cote');

const requester = new Requester({ name: 'app' });

const event = {
  type: 'currency-conversion',
  quantity: 100,
  from: 'USD',
  to: 'EUR',
};

setInterval(() => {
  requester.send(event, (result) => console.log({ result }));
}, 1000);
