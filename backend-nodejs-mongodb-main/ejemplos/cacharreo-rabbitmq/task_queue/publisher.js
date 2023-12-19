const amqp = require('amqplib');

main().catch((err) => console.log(err));

async function main() {
  const connection = await amqp.connect('amqp://localhost');

  const channel = await connection.createChannel();

  const queue = 'task-queue';
  const message = process.argv.slice(2).join(' ') || 'Hello, world!';

  console.log(message);

  channel.assertQueue(queue, { durable: false });

  channel.sendToQueue(queue, Buffer.from(message));
  console.log(' [x] Sent %s', message);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}
