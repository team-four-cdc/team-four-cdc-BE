const express = require('express');
const router = express.Router();

const networkRoute = require('./networkRouter');
const userRoute = require('./userRouter');
const authRoute = require('./authRouter');

router.use('/network', networkRoute);
router.use('/', userRoute);
router.use('/auth', authRoute);

module.exports = router;
