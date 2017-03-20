const router = require('express').Router();
const app = require('../index');

router.get('/', (req, res, next) => {
    req.session.user = undefined;
    console.log(app.locals);
    console.log('登出成功');
    res.redirect('/');
})

module.exports = router;
