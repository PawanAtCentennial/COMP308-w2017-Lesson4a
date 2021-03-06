let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
//mongoose statement here

let mongoose= require("mongoose");

//mongoose uri

let URI= "mongodb://thomas:thomas@ds046367.mlab.com:46367/games"

mongoose.connect(URI,(err)=>{
  if(err)
  {
    console.log("error connecting to db");
  }
  else{
    console.log("connected to db");
 
  }
})


//connect mongoose to mongo db and use games db
/* mongoose.connect("mongodb://localhost/games",(err)=>{
  if(err)
  {
    console.log("error connecting to db");
  }
  else{
    console.log("connected to db");
 
  }
}) */



let index = require('./routes/index');
//let users = require('./routes/users');

let app = express();

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

app.use('/', index);
//we deleted the users page
//app.use('/users', users);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
