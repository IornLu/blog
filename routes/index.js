module.exports = app => {
    app.use('/article', require('./article'));
    app.use('/admin', require('./admin'));
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
    app.use('/', (req, res, next) => {
        res.redirect('/article');
    });
}
