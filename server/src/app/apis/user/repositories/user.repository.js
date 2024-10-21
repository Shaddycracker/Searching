const User = require('../../../models/user.model');

class UserRepository {
    async find(filter) {
        return User.findOne(filter).exec();
    }

    async create(data) {
        return User.create(data);
    }
}

module.exports = new UserRepository();
