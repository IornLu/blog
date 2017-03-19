const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const config = require('config-lite');
const flash = require('flash');

const routes = require('./routes');

const app = express();

// set template
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// static file path
app.use(express.static(path.join(__dirname, 'public')))

// log midulewire
app.use(morgan('dev'));

const { port } = config;
const { secret, key, maxAge } = config.session;
app.use(session({
    secret, key, maxAge,
}));
app.use(flash());

app.locals.blog = {
    pageTitle: 'Iron\'s blog'
}

routes(app);

app.listen(config.port, '0.0.0.0');
console.log(`Server listening on ${config.port}`);
