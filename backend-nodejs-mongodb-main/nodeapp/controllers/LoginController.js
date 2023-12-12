const User = require('../models/Usuario');

class LoginController {
  static index(req, res, next) {
    res.locals.error = '';
    res.locals.email = 'admin@admin.com';
    res.render('login');
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email || !password)
        return res.status(400).json({ err: 'Email and password are required' });

      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        res.locals.error = req.__('Incorrect email or password');
        res.locals.email = email;
        return res.render('login');
      }

      res.redirect('/privado');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
