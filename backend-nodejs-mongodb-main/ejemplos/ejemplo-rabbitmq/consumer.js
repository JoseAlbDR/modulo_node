'use strict';
const amqplib = require('amqplib');
require('dotenv/config');

const QUEUE = 'tasks';

main().catch((err) => console.log(err));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // connect to RabbitMQ broker
  const connection = await amqplib.connect(process.env.RABBITMQ_URL);

  // create a channel
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, {
    durable: true,
  });

  channel.prefetch(3); // Give me a message until I confirm that is done (ack), pending ack's

  channel.consume(QUEUE, async (message) => {
    const payload = message.content.toString();
    console.log(payload);
    await sleep(5000);
    channel.ack(message);
  });
}
