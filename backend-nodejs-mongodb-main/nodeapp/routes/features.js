const express = require('express');
const FeaturesController = require('../controllers/features');

const router = express.Router();

router.get('/', FeaturesController.renderFeatures);

module.exports = router;
