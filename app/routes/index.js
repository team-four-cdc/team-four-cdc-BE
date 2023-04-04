const express = require('express');
const router = express.Router();

const networkRoute = require('./networkRouter');
const userRoute = require('./userRouter');
const authRoute = require('./authRouter');
const categoryRoute = require('./categoryRouter');

router.use('/network', networkRoute);
router.use('/', userRoute);
router.use('/auth', authRoute);
router.use('/category', categoryRoute);

module.exports = router;
