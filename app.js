var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var yelp = require('./routes/yelp');

var eventful = require('./routes/eventful');
var yelp = require('./routes/yelp');
var favorites = require('./routes/favorites');
var expedia = require('./routes/expedia');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));

app.use('/eventful', eventful);
app.use('/yelp', yelp);
app.use('/expedia', expedia);
app.use('/favorites', favorites);

// passport config
var Accounts = require('./models/account');
passport.use(new LocalStrategy(Accounts.authenticate()));
passport.serializeUser(Accounts.serializeUser());
passport.deserializeUser(Accounts.deserializeUser());

// mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LocalAdvisor');

app.post('/register', function(req, res) {
  console.log(req.body);
  Accounts.register(new Accounts({
    username: req.body.username
  }), req.body.password, function(err, account) {
    if (err) {
      return res.status(400).json(err);
    }
    passport.authenticate('local')(req, res, function() {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.status(200).json({
    status: 'Login successful!'
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

app.get('/status', function(req, res) {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
