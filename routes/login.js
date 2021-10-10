var express = require('express');
var loginRouter = express.Router();
const passport = require("passport");
const session = require("express-session");

/* GET users listing. */
loginRouter.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

loginRouter.post('/', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
})
);


module.exports = loginRouter;
