var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var items = require('./routes/items');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose')
var dbName = 'ECOM_Dev';
var connectionString = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(connectionString);


// Session Maneger 
app.use(session({
  secret: 'asfakfvoqwfkoqwfkowqfoqw',
  resave: false,
  saveUninitialized: false
  //cookie: { secure: true }
}))


// login Manger Function 
app.use(function(req,res,next){
	console.log(req.session.key,req.path,req.url)
	if(!!req.session.key || req.path === '/login' || req.path === '/'){
		next();
	} else {
		res.json({"message":"please try to login"})
	}
})


app.use('/', index);
app.use('/', users);
app.use('/home',home);
app.use('/', items);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
