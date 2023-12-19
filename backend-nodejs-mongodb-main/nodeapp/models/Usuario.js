const { default: mongoose } = require('mongoose');
const emailTransportConfigure = require('../lib/emailTransportConfigure');
const nodemailer = require('nodemailer');
const channelPromise = require('../lib/rabbitMQLib');
require('dotenv/config');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
});

// metodo estático que un hash de una pasword
userSchema.statics.hashPassword = (rawPassword) => {
  return bcrypt.hash(rawPassword, 10);
};

// método para pedir a otro servicio que envie un email (RabbitMQ)

userSchema.methods.sendEmailRabbitMQ = async function (subject, body) {
  // cargar rabbitMQLib
  const EXCHANGE = 'email-request';
  const channel = await channelPromise;
  await channel.assertExchange(EXCHANGE, 'direct', {
    durable: true,
  });

  const message = {
    subject,
    to: this.email,
    html: body,
  };

  channel.publish(EXCHANGE, '*', Buffer.from(JSON.stringify(message)));
};

userSchema.methods.comparePassword = function (rawPassword) {
  return bcrypt.compare(rawPassword, this.password);
};

userSchema.methods.sendEmail = async function (subject, body) {
  const transport = await emailTransportConfigure();

  const result = await transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject,
    // text plain text
    html: body,
  });
  console.log(
    `URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`,
    {
      result,
    }
  );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
