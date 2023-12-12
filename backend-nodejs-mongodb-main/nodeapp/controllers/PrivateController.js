class PrivateController {
  static index = (req, res, next) => {
    res.render('private');
  };
}

module.exports = PrivateController;
