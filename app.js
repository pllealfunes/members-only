var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var User = require('./models/userSchema');
var bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signUpRouter = require('./routes/signUp');
var upgradeMemberRouter = require('./routes/upgradeMember');
var newMessageRouter = require('./routes/newMessage');
require('dotenv').config();
var app = express();

mongoose.connect(`${process.env.DB_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log('error')
        //return done(err);
      }
      if (!user) {
        //console.log('no user found')
        return done(null, false, { msg: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          console.log('login success')
          return done(null, user);
        } else {
          // passwords do not match!
          console.log('failed to login')
          return done(null, false, { msg: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signUp', signUpRouter);
app.use('/upgradeMember', upgradeMemberRouter);
app.use('/newMessage', newMessageRouter);

// catch 404 and forward to error handler
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
