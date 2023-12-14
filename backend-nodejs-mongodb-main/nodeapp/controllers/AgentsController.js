const Agent = require('../models/Agente');

class AgentsController {
  static renderNew = (req, res) => {
    res.render('agents-new');
  };

  static createAgent = async (req, res) => {
    try {
      const userId = req.session.user;
      const { name, age } = req.body;

      console.log(req.body);

      const agente = new Agent({ name, age, owner: userId });
      await agente.save();

      res.redirect('/private');
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AgentsController;
