const express = require('express')

const { UserController } = require("../../controllers")

const router = express.Router();


router.post("/singnup", UserController.signup);

router.post("/singnin", UserController.signin);

module.exports = router