var express = require('express');
var userRouter = express.Router();
var User = require('../models/userSchema');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

/* GET users listing. */
userRouter.get('/', function (req, res, next) {
    res.render('signUp', { title: 'Sign Up' });
});

/*userRouter.post("/", (req, res, next) => {
    const newUser = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    let user = new User(newUser);
    user.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });
});*/

userRouter.post("/", [
    check('username', 'Userame must have more than 5 characters').not().bail().isEmpty().bail().isLength({ min: 5 }).bail(),
    check('name', 'Name must have more than 5 characters').not().bail().isEmpty().bail().isLength({ min: 5 }).bail(),
    check('password', 'Your password must be at least 5 characters').not().bail().isEmpty().bail().isLength({ min: 5 }).bail(),
    check('email', 'Your email is not valid').not().bail().isEmpty().bail().isEmail().bail().normalizeEmail().bail(),
    check(
        'confirmPassword',
        'Password Confirmation field must have the same value as the password field',
    )
        .exists().bail()
        .custom((value, { req }) => value === req.body.password).bail(),
    check("username").custom(value => {
        return User.find({
            username: value
        }).then(user => {
            if (user.length > 0) {
                // Custom error message and reject
                // the promise
                return Promise.reject('Username already in use');
            }
        });
    }).bail()
], (req, res, next) => {
    //User.find({ "username": req.body.username })
    /*.then((user) => {
        let userExists = user
        if (userExists.length > 0) {
            return res.render("signUp", { title: 'Sign Up', error: "User already exists" });
        }*/
    const errors = validationResult(req);
    //console.log(errors.array());
    if (!errors.isEmpty()) {
        res.render('signUp', { title: 'Sign Up', errors: errors.array() });
        //console.log(errors.array());
    } else {
        bcrypt.hash(req.body.password.trim(), 10, (err, hashedPassword) => {
            const newUser = {
                name: req.body.name.trim(),
                username: req.body.username.trim(),
                email: req.body.email.trim(),
                password: hashedPassword
            };
            let user = new User(newUser);
            user.save()
                .then(() => {
                    res.redirect('/login');
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        });
    }
});


module.exports = userRouter;