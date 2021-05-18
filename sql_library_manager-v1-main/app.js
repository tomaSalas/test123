var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var book = require("./models/index");

var app = express();

// databa connection
let db = require('./models').sequelize;
// //connects and syncs the db
(async () => {
  try {
    await db.authenticate();
    console.log("Success connecting to the database...");
  } catch (error) {
    console.log("Error authenticating: ", error);
  }
})();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  var stat = err.status;
  if (stat === 404) {
    res.status(err.status);
    res.render('page-not-found');
  } else {
    res.status(err.status || 500);
    res.render('error');
  }
});


module.exports = app;
