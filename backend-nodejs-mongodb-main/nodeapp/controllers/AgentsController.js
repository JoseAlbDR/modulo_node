const createHttpError = require('http-errors');
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

  static deleteAgent = async (req, res) => {
    const { id } = req.params;
    const { user } = req.session;

    try {
      const agent = await Agent.findById(id);

      if (!agent) {
        console.warn(
          `WARNING: User ${id} tried to delete an inexistent agent (${agent.id})`
        );
        next(createHttpError(404, 'Not found'));
        return;
      }

      if (agent.owner.toString() !== user) {
        console.warn(
          `WARNING: User ${id} tried to delete a not owned agent (${agent.id})`
        );
        next(createHttpError(401, 'Unauthorized'));
        return;
      }

      await Agent.deleteOne({ _id: id });

      res.redirect('/private');
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AgentsController;
