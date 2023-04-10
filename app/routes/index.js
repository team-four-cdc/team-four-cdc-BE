const express = require('express');
const router = express.Router();

const networkRoute = require('./networkRouter');
const userRoute = require('./userRouter');
const authRoute = require('./authRouter');
const categoryRoute = require('./categoryRouter');
const articleRoute = require('./articleRouter');

router.use('/network', networkRoute);
router.use('/', userRoute);
router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/article', articleRoute);

module.exports = router;
