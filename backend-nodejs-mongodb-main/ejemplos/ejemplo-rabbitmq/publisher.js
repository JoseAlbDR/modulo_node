`use strict`;
const amqplib = require('amqplib');
require('dotenv/config');
const EXCHANGE = 'task-request';

main().catch((err) => console.log(err));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // connect to RabbitMQ broker
  const connection = await amqplib.connect(process.env.RABBITMQ_URL);

  // create a channel
  const channel = await connection.createChannel();

  // ensure that exist a exchange
  await channel.assertExchange(EXCHANGE, 'direct', {
    // direct is the type, can be topic and many more
    durable: true, // exchange will survive broker restarts
  });

  while (true) {
    // publish messages
    const message = {
      task: 'send an email' + Date.now(),
    };

    channel.publish(EXCHANGE, '*', Buffer.from(JSON.stringify(message)), {
      // * is all queues
      persistent: true, // message will survive broker restarts
    });

    console.log({ message });
    await sleep(2000);
  }
}
