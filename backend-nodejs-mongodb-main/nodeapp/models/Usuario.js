const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
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

userSchema.methods.comparePassword = function (rawPassword) {
  return bcrypt.compare(rawPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
