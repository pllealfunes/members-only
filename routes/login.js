var express = require('express');
var router = express.Router();
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login', user: req.user });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
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

router.post('/', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
})
);

router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});



module.exports = router;
