const express = require('express');
const cors = require('cors');
const appRoot = require('app-root-path');
const corsConfig = require(`${appRoot}/config/corsConfig`);
const { networkController } = require(`${appRoot}/app/controllers`);

function networkRouter(app) {
  const route = express.Router();

  app.use('/network', cors(corsConfig), (req, res, next) => {
    res.set('Cache-Control', 'no-store,no-cache,must-revalidate,max-age=0');
    res.set('Pragma', 'no-cache');
    next();
  }, route);

  route.get('/ping-check', networkController.getPing);
}

module.exports = networkRouter;
