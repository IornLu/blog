const UserModel = require('../models/User');
module.exports = {
    checkLogin: (req, res, next) => {
        if (!req.session.user) {
            return res.status(403).send("请登录");
        }
        next();
    },
    checkNotLogin: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('back');
        }
        next();
    },
    checkSuperUser: (req, res, next) => {
        UserModel.getUserById(req.session.user)
        .then(user => {
            if (user && !user.superUser) {
                console.log(user);
                return res.status(403).send('您不是管理员，无法访问');
            }
        });
        next();
    }
}
