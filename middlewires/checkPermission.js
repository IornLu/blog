const UserModel = require('../models/User');
module.exports = {
    checkLogin: (req, res, next) => {
        if (!req.session.user) {
            return res.status(403).render('error', {
                errorCode: 403,
                errorMessage: '请登录后操作',
            });
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
            if (user === null || !user.superUser) {
                return res.status(403).render('error', {
                    errorCode: 401,
                    errorMessage: '您不是管理员，无法访问',
                });
            }
            next();
        });
    }
}
