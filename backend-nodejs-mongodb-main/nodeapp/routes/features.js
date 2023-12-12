const express = require('express');
const FeaturesController = require('../controllers/FeaturesController');

const router = express.Router();

router.get('/', FeaturesController.renderFeatures);

module.exports = router;
