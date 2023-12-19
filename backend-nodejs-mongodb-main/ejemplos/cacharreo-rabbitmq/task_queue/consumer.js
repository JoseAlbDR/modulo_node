const amqp = require('amqplib');

main().catch((err) => console.log(err));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const connection = await amqp.connect('amqp://localhost');

  const channel = await connection.createChannel();

  const queue = 'hello';

  await channel.assertQueue('hello', { durable: false });

  channel.consume(
    queue,
    async (message) => {
      const payload = message.content.toString();
      console.log(payload);
      await sleep(1000);
    },
    { noAck: true }
  );
}
