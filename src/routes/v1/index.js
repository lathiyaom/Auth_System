const express = require('express');

const UserRouter = require("./user-routes")

const router = express.Router();

router.use("/signup", UserRouter);

module.exports = router;