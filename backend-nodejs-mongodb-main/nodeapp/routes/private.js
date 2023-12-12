const express = require('express');
const PrivateController = require('../controllers/PrivateController');

const router = express.Router();

router.get('/', PrivateController.index);

module.exports = router;
