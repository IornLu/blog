const UserModel = require('../lib/mongo').User

module.exports = {
    create: user => {
        return UserModel.create(user).exec();
    },
    getUserByEmail: email => {
        return UserModel.findOne({ email }).exec();
    },
    getUserById: _id => {
        return UserModel.findOne({ _id }).exec();
    }
}
