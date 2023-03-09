var { Sequelize } = require('sequelize');
var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

// var { passport} =  require('./config/passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var saleRouter = require('./routes/sale');
var pg = require('pg');


var app = express();

var con_string = require('./config/keys').PostgresURI;

const sequelize = new Sequelize(con_string)

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.get('/home', indexRouter);
app.use('/users', usersRouter);
app.post('/sign_up', usersRouter);
app.get('/register', usersRouter);
app.post('/login', usersRouter);
app.get('/logout', usersRouter);
app.get('/sale', saleRouter);
app.get('/stock', saleRouter);

app.get('/donor', saleRouter);
app.post('/add_donor', saleRouter);

app.post('/add_stock', saleRouter);
app.post('/add_cat', saleRouter);

app.get('/checkout', saleRouter);
app.get('/charts', saleRouter);
app.post('/checkout', saleRouter);


app.get('/checkout_success', function(req, res, next) {

    res.render('checkout_success', { title: 'Success' });

});




app.get('/s', function(req, res, next) {

    res.render('signup_success', { title: 'Home' });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;