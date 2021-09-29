var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('signUp', { title: 'Sign Up' });
});

router.post("/", (req, res, next) => {
    let newUser = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,

    };
    let user = new User(newUser);
    user.save(err => {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
});



module.exports = router;