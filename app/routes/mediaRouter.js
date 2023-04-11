const express = require('express');
const router = express.Router();
const { mediaController } = require('../controllers');
const { authJWT } = require('../middlewares/authJWT');

router.get('/:filename', authJWT, mediaController.getMedia);

module.exports = router;
