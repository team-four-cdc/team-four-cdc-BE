const express = require("express");

const appRoot = require("app-root-path");

const { networkController } = require(`${appRoot}/app/controllers`);
const router = express.Router();

router.get("/ping-check", networkController.getPing);

module.exports = router;
