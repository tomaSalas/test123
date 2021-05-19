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



// 404 error handler
app.use(function(req, res, next) {
  const err = new Error() ;
  err.status = 404 ;
  err.message = "Ops! We couldn't find the page you were looking for." ;
  next(err) ;
});


// Global error handler
app.use(function(err, req, res, next) {

  if (err.status === 404) {
    res.status(404).render('page-not-found', {err}) ;
} else {
    err.status = 500 ;
    err.message = 'Ops! the query requested does not exist.' ;
    res.status(err.status).render('error', {err}) ;
}});

module.exports = app;
