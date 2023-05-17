const express = require('express');
const router = express.Router();
const { mediaController } = require('../controllers');

router.get('/:filename', mediaController.getMedia);

module.exports = router;
