const express = require('express');
const AgentsController = require('../controllers/AgentsController');
const sessionAuthMiddleware = require('../lib/sessionAuthMiddleware');

const router = express.Router();

router.get('/', sessionAuthMiddleware, AgentsController.renderNew);
router.post('/', sessionAuthMiddleware, AgentsController.createAgent);

module.exports = router;
