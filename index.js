const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const config = require('config-lite');
const flash = require('flash');
const bodyPaser = require('body-parser');
const routes = require('./routes');
const markdownit = require('markdown-it');
const app = express();

// set template
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// static file path
app.use(express.static(path.join(__dirname, 'public')))

// log midulewire
app.use(morgan('dev'));

// body parser
app.use(bodyPaser());

const { port } = config;
const { secret, key, maxAge } = config.session;
app.use(session({
    secret, key, maxAge,
}));
app.use(flash());

app.use((req, res, next) => {
    app.locals.session = req.session;
    next();
})
app.locals.blog = {
    pageTitle: 'Iron\'s blog'
}

routes(app);

app.listen(config.port, '0.0.0.0');
console.log(`Server listening on ${config.port}`);

module.exports = app;
