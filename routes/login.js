var express = require('express');
var loginRouter = express.Router();
const passport = require("passport");


/* GET users listing. */
loginRouter.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

loginRouter.post('/', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});


module.exports = loginRouter;
