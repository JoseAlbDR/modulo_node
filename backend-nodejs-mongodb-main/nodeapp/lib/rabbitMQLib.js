const amqplib = require('amqplib');

const channelPromise = amqplib
  .connect(process.env.RABBITMQ_BROKER_URL)
  .then((connection) => {
    return connection.createChannel();
  });

module.exports = channelPromise;
