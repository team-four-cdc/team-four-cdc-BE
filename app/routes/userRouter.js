const express = require('express');
const cors = require('cors');
const appRoot = require('app-root-path');
const corsConfig = require(`${appRoot}/config/corsConfig`);
const { userController } = require(`${appRoot}/app/controllers`);

function userRouter(app) {
  const route = express.Router();

  app.use('/user', cors(corsConfig), (req, res, next) => {
    res.set('Cache-Control', 'no-store,no-cache,must-revalidate,max-age=0');
    res.set('Pragma', 'no-cache');
    next();
  }, route);

  route.post('/registration/reader', userController.createUserReader);
}

module.exports = userRouter;
