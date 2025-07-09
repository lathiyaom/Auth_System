const { StatusCodes } = require('http-status-codes')

const { ErrorResponse } = require("../utils/common")

const  AppError  = require("../utils/error/app-error")

function ValidateAuthRequest(req, res, next) {

    if (!req.body.email) {
        ErrorResponse.message = "Something went wrong while Authantication user";
        ErrorResponse.error = new AppError(["Email is not found into you request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }

    if (!req.body.password) {
        ErrorResponse.message = "Something went wrong while Authantication user";
        ErrorResponse.error = new AppError(["password is not found into you request"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }

    next();
}


module.exports = {
    ValidateAuthRequest
}