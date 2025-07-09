const { UserRepository } = require("../repositories")

const AppError = require("../utils/error/app-error");

const { StatusCodes } = require("http-status-codes");

const { Auth } = require('../utils/common')

const userRepo = new UserRepository();

async function createUser(data) {
    try {
        const user = await userRepo.createRecoreds(data)
        return user;
    } catch (error) {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            const explanations = error.errors.map(err => err.message);
            throw new AppError(explanations.join(", "), StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Cannot create a new City object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        const user = await userRepo.getUserByEmail(data.email);

        if (!user) {
            throw new AppError("No user found for the given email", StatusCodes.BAD_REQUEST);
        }

        const passWordCheck = Auth.checkPassword(data.password, user.password);

        if (!passWordCheck) {

            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST)
        }

        const jwt = Auth.creatToken({ id: user.id, email: user.email });

        return jwt;

    } catch (error) {
        console.log(error)
        throw error;
    }
}


async function isAuthenticated(token) {

    try {

        if (!token) {
            throw new AppError("Missing JWT TOKEN", StatusCodes.BAD_REQUEST)
        }
        const response = Auth.verifyToken(token);

        const user = await userRepo.get(response.id);

        if (!user) {
            throw new AppError("No User found", StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {

        if (error instanceof AppError) throw error;

        if (error.name == 'JsonWebTokenError') {
            throw new AppError("Invalid JWT TOKEN", StatusCodes.BAD_REQUEST);
        }

        console.log(error);
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
module.exports = {
    createUser,
    signin,
    isAuthenticated
}