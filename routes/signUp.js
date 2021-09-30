var express = require('express');
var userRouter = express.Router();
var User = require('../models/userSchema');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* GET users listing. */
userRouter.get('/', function (req, res, next) {
    res.render('signUp', { title: 'Sign Up' });
});

userRouter.post("/", (req, res, next) => {
    const newUser = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    let user = new User(newUser);
    /*user.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });*/
    console.log(newUser);
});



module.exports = userRouter;