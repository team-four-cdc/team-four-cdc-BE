const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.post("/user/register", userController.createUserController);
router.post("/user/verify", userController.verifyUserController);

module.exports = router;
