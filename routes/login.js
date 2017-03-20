const router = require('express').Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const permission = require('../middlewires/checkPermission');

router.post('/',
    (req, res, next) => {
        const { email, password } = req.body;
        UserModel.getUserByEmail(email)
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.user = user._id;
                    return res.redirect('/admin/');
                }
            }
            res.status(401).send(JSON.stringify({ message: '用户名或密码错误' }));
    })
    }
)
module.exports = router;
