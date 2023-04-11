const express = require('express');
const router = express.Router();

const networkRoute = require('./networkRouter');
const userRoute = require('./userRouter');
const authRoute = require('./authRouter');
const categoryRoute = require('./categoryRouter');
const articleRoute = require('./articleRouter');
const mediaRoute = require('./mediaRouter');

router.use('/network', networkRoute);
router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/article', articleRoute);
router.use('/media', mediaRoute);

module.exports = router;
