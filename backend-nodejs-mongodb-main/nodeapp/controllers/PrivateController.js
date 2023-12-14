const Agente = require('../models/Agente');
const User = require('../models/Usuario');
const createError = require('http');

class PrivateController {
  static index = async (req, res, next) => {
    try {
      const idUser = req.session.user;

      const user = await User.findById(idUser);

      if (!user) {
        next(createError(500, 'user not found'));
      }

      const agents = await Agente.find({ owner: user.id });

      res.render('private', { email: user.email, agents });
    } catch (error) {
      next(error);
      return;
    }
  };
}

module.exports = PrivateController;
