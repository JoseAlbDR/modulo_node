'use strict';
const amqplib = require('amqplib');
const nodemailer = require('nodemailer');
require('dotenv/config');

const QUEUE = 'email-sender';

main().catch((err) => console.log('There was an error', err));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // connect to RabbitMQ broker
  const connection = await amqplib.connect(process.env.RABBITMQ_URL);
  const transport = await createTransport();

  // create a channel
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, {
    durable: true,
  });

  channel.prefetch(1); // 1 on 1, send confirm,

  channel.consume(QUEUE, async (message) => {
    const { to, html, subject } = JSON.parse(message.content.toString());
    // console.log({ subject, to, html });

    const result = await transport.sendMail({
      from: process.env.EMAIL_SERVICE_FROM,
      to,
      subject,
      // text plain text
      html,
    });
    console.log(
      `URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`
      // {
      //   result,
      // }
    );

    channel.ack(message);
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
