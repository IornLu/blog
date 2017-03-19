module.exports = app => {
    app.use('/article', require('./article'));
    app.use('/', (req, res) => {
        res.redirect('/article');
    });
}