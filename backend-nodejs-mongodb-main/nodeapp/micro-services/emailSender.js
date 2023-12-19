'use strict';
const amqplib = require('amqplib');
require('dotenv/config');

const QUEUE = 'email-sender';

main().catch((err) => console.log('There was an error', err));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // connect to RabbitMQ broker
  const connection = await amqplib.connect(process.env.RABBITMQ_URL);

  // create a channel
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, {
    durable: true,
  });

  channel.prefetch(1); // Give me a message until I confirm that is done (ack), pending ack's

  channel.consume(QUEUE, async (message) => {
    const payload = message.content.toString();
    console.log(payload);
    await sleep(100);
    channel.ack(message);
  });
}
