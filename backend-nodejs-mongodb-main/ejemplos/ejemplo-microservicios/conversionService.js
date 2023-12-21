'use strict';

const { Responder } = require('cote');

const taxes = {
  USD_EUR: 0.94,
  EUR_USD: 1.06,
};

const responder = new Responder({
  name: 'currency service',
});

responder.on('currency-conversion', (req, done) => {
  console.log({ req });
  const { quantity, from, to } = req;

  const conversion = from === 'USD' ? taxes.USD_EUR : taxes.EUR_USD;

  const result = quantity * conversion;

  console.log({ result });
  done(result);
});
