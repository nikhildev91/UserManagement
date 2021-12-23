var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {create}= require('express-handlebars')
const session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersSignupRouter = require('./routes/user-signup')
var userLoginRouter = require('./routes/user-login')
var adminLoginRouter = require('./routes/admin-login')
var adminsRouter = require('./routes/admin-panel')


var database = require('./dataConfig/connection')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const hbs = create({
  layoutsDir:`${__dirname}/views/layouts`,
  extname:`hbs`,
  defaultLayout:`layout`,
  partialsDir:`${__dirname}/views/partials`

});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:"Key", cookie:{maxAge:400000}}));


app.use((req, res, next)=>{
 res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
 next()
})

// check the DataBase in connected or not

database.connect((err)=>{
  if (err){
    console.log("connection error", err);
  }else{
    console.log("DataBase Connected");
  }
})


//when call webpage in browser first come here

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user-signup', usersSignupRouter)
app.use('/user-login', userLoginRouter)
app.use('/admin-login', adminLoginRouter)
app.use('/admin', adminsRouter)

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
