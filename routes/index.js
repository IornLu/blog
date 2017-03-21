module.exports = app => {
    app.use('/article', require('./article'));
    app.use('/admin', require('./admin'));
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
    app.use('/', (req, res, next) => {
        if (req.path === '/')
            return res.redirect('/article');
        next();
    });
    app.use('*', (req, res, next) => {
        res.render('error', {
            errorCode: 404,
            errorMessage: '请求的页面走丢了',
        });
    })
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).render('error', {
            errorCode: 500,
            errorMessage: '服务器抽了一下风',
        })
    });
}
