class LoginController {
  static index(req, res, next) {
    res.render('login');
  }

  static login(req, res, next) {
    console.log(req.body);
    res.send('Clear');
  }
}

module.exports = LoginController;
