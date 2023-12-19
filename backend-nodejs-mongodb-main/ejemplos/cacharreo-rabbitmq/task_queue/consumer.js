const amqp = require('amqplib');

main().catch((err) => console.log(err));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const connection = await amqp.connect('amqp://localhost');

  const channel = await connection.createChannel();

  const queue = 'task_queue';

  await channel.assertQueue('task_queue', { durable: false });

  channel.consume(
    queue,
    async (message) => {
      var secs = message.content.toString().split('.').length;

      console.log(' [x] Received %s', message.content.toString());
      setTimeout(() => {
        console.log(' [x] Done');
      }, secs * 1000);
    },
    { noAck: true }
  );
}
