const express = require("express");
const router = express.Router();

const networkRoute = require("./networkRouter");
const userRoute = require("./userRouter");

router.use("/network", networkRoute);
router.use("/", userRoute);

module.exports = router;
