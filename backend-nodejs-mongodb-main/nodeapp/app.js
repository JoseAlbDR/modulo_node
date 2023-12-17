var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv/config');
const basicAuthMiddleware = require('./lib/basicAuthMiddleware');
const swaggerMiddleware = require('./lib/swaggerMiddleware');
const i18n = require('./lib/i18nConfigure');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionAuthMiddleware = require('./lib/sessionAuthMiddleware');
const AgentsController = require('./controllers/AgentsController');
const LoginController = require('./controllers/LoginController');

require('./lib/connectMongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// definimos una variable de vista que estará disponible
// en todos los render que hagamos
app.locals.title = 'NodeApp';

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // parea el body en formato urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/pdfs', express.static(path.join(__dirname, 'd:/pdfs')));

// app.use((req, res, next) => {
//   console.log('Ha llegado una petición a', req.url);
//   next('zzz');
// });

/**
 * Rutas del API
 */
app.use('/api-doc', swaggerMiddleware);
app.post('/api/v1/login', LoginController.postJWT);
app.use('/api/agentes', basicAuthMiddleware, require('./routes/api/agentes'));

/**
 * Rutas del website
 */
app.use(i18n.init);
app.use(
  session({
    name: 'nodeapp-session', // cookie name
    secret: 'milittlesecret',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
// Session available in all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', require('./routes/index'));
app.use('/features', require('./routes/features'));
app.use('/users', require('./routes/users'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/login', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));
app.use('/private', require('./routes/private'));
app.use('/agents-new', require('./routes/agents'));
app.get(
  '/delete-agent/:id',
  sessionAuthMiddleware,
  AgentsController.deleteAgent
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // comprobar si es un error de validación
  if (err.array) {
    const errorInfo = err.errors[0]; // err.array({ onlyFirstError: true })[0]
    console.log(errorInfo);
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.path} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  // si lo que ha fallado es una petición al API
  // responder con un error en formato JSON
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
