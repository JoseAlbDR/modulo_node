const nodemailer = require('nodemailer');

const createTransport = async () => {
  const testAccount = await nodemailer.createTestAccount();

  const developmentTransport = {
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };

  const productionTransport = {
    service: process.env.EMAIL_SERVICE_NAME,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    },
  };

  const transport = nodemailer.createTransport(developmentTransport);

  return transport;
};

module.exports = createTransport;
