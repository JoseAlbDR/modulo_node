const User = require('../models/Usuario');

class PrivateController {
  static index = async (req, res, next) => {
    const idUser = req.session.user;

    const user = await User.findById(idUser);

    res.locals.email = user.email;

    res.render('private');
  };
}

module.exports = PrivateController;
