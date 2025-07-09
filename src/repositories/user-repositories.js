const CrudRepository = require("./crud-repo")

const { User } = require("../models")


class UserRepository extends CrudRepository {
    constructor() {
        super(User)
    }
}

module.exports = UserRepository