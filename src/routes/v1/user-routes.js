const express = require('express')

const { UserController } = require("../../controllers")

const { AuthenticationMiddlewares } = require("../../middlewares")
const router = express.Router();


router.post("/singnup", AuthenticationMiddlewares.ValidateAuthRequest, UserController.signup);

router.post("/singnin", AuthenticationMiddlewares.ValidateAuthRequest, UserController.signin);

module.exports = router