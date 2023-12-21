'use strict';

const { Responder } = require('cote');
const nodemailer = require('nodemailer');

main().catch((err) => console.log(err));

async function main() {
  const responder = new Responder({ name: 'email service' });
  const transport = await createTransport();
  responder.on('send-email', async (req, done) => {
    try {
      const { from, to, subject, html } = req;

      const result = await transport.sendMail({
        from,
        to,
        html,
        subject,
      });

      console.log(`Email sent. URL: ${nodemailer.getTestMessageUrl(result)}`);
      done(result);
    } catch (error) {
      done('There was an error');
    }
  });
}

async function createTransport() {
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

  const transport = nodemailer.createTransport(developmentTransport);

  return transport;
}
