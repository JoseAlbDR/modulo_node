var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('./lib/connectMongoose');

// const Agente = require('./models/Agente');

// const agentes = Agente.find({}).then((response) => console.log(response));

// console.log(agentes);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('Ha llegado una peticion a ' + req.url);
  // res.send('Hola');
  next();
});

// Rutas API
app.use('/api/agentes', require('./routes/api/agentes'));

// Rutas website
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // comprobar si es un error de valicadion

  console.log('eeeeeeeeeeeeeeeeeeeeeeeeroooooooooooooooor');

  if (err.array) {
    const errorInfo = err.errors[0];
    err.message = `Error en: ${errorInfo.location}, parámetro: ${errorInfo.path}, ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  // si lo que ha fallado es una peticion al API
  // responder con un error en formato JSON
  if (req.originalUrl.startsWith('/api')) {
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
