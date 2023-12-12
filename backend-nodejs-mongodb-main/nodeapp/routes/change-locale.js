const express = require('express');
const LangController = require('../controllers/lang');

const router = express.Router();

router.get('/:locale', LangController.translate);

module.exports = router;
