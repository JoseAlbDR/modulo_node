const express = require('express');
const LangController = require('../controllers/LangController');

const router = express.Router();

router.get('/:locale', LangController.translate);

module.exports = router;
