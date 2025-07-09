const { UserRepository } = require("../repositories")

const { AppError } = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

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
module.exports = {
    createUser
}