var express = require('express');
var loginRouter = express.Router();
const passport = require("passport");


/* GET users listing. */
loginRouter.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});


loginRouter.post('/', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
})
);

loginRouter.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});



module.exports = loginRouter;
