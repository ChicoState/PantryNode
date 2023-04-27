const { Sequelize } = require('sequelize');
var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
require('./config/passport')(passport);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var saleRouter = require('./routes/sale');
var feedRouter = require('./routes/feed');
var itemsRouter = require('./routes/items');
var summaryRouter = require('./routes/summary');
var stockRouter = require('./routes/stock');
var barcodeRouter = require('./routes/barcode');

var app = express();

const cors = require('cors');
// TODO(#119): Specifiy origin with an EnvVar.
app.use(cors({
    origin: '*'
}));

let keys = require('./config/keys');
let con_string = keys.PostgresURI;
const sequelize = new Sequelize(con_string)

try {
    sequelize.authenticate().then(results => {
        console.log('Connection has been established successfully.')
    }) 
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
    saveUninitialized: true,
    cookie: {
        expires: 60 * 60 * 24,
        httpOnly: false,
        secure: true,
      },
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
app.get('/categories', saleRouter);

//barcodelookup
app.get('/barcode', barcodeRouter);

app.get('/donor', saleRouter);
app.post('/add_donor', saleRouter);

app.post('/add_stock', saleRouter);
app.post('/add_cat', saleRouter);

app.get('/checkout', saleRouter);
app.get('/charts', saleRouter);
app.post('/checkout', saleRouter);

app.get('/feed', feedRouter);

app.get('/items', itemsRouter);
app.get('/items/expired', itemsRouter);
app.get('/items/nearly_expired', itemsRouter);

app.get('/purchases', summaryRouter);
app.get('/currentstock', summaryRouter);
app.get('/wastemanagement', summaryRouter);
app.get('/soontoexpire', summaryRouter);

app.get('/stock', stockRouter);

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
    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;