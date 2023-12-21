const JWT = require('jsonwebtoken');
const User = require('../models/Usuario');
require('dotenv/config');

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

      // user.sendEmail('Bienvenido', 'Bienvenido a NodeApp');
      // user.sendEmailRabbitMQ('Bienvenido', 'Bienvenido a NodeApp');
      const result = await user.sendEmailCote(
        'Bienvenido',
        'Bienvenido a Nodeapp Cote'
      );

      console.log({ result });

      console.log('User sent email');

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

  static async postJWT(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email || !password)
        return res.status(400).json({ err: 'Email and password are required' });

      const user = await User.findOne({ email });

      const isMatch = await user.comparePassword(password);

      if (!user || !isMatch) {
        return res.json({ error: 'Invalid credentials' });
      }

      const tokenJWT = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
      });

      res.json({ token: tokenJWT });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = LoginController;
