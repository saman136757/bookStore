var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/bookStoreTops", {
  useNewUrlParser: true
});
let installation = require('./tools/installation');
installation()
const session = require('express-session')
const passport = require('passport')


var apiRouter = require('./routes/api');
var flash = require('connect-flash');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + 'signUpTools'))
app.use(flash());

app.use(session({
  secret: 'ilovescotchscotchyscotchscotch',
  resave: true,
  cookie: {
    maxAge: 600000
  }
}))
app.use(passport.initialize());
app.use(passport.session())




app.use('/', apiRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;