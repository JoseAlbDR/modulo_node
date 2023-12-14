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

      const isMatch = await user.comparePassword(password);

      if (!user || !isMatch) {
        res.locals.error = req.__('Incorrect email or password');
        res.locals.email = email;
        return res.render('login');
      }

      req.session.user = user.id;
      res.redirect('/private');
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    });
  }
}

module.exports = LoginController;
