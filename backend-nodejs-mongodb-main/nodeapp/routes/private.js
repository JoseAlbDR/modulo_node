const express = require('express');
const PrivateController = require('../controllers/PrivateController');

const sessionAuthMiddleware = require('../lib/sessionAuthMiddleware');

const router = express.Router();

router.get('/', sessionAuthMiddleware, PrivateController.index);

module.exports = router;
