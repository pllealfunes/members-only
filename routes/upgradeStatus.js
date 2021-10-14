var express = require('express');
var upgradeStatusRouter = express.Router();
var User = require('../models/userSchema');
const { check, validationResult } = require('express-validator');

/* Display upgradeMmeber page and get user info */
upgradeStatusRouter.get('/', (req, res, next) => {
    console.log(req.user);
    res.render('upgradeStatus', { title: 'Upgrade to Your Status', user: req.user });
});


/* Make user a member if they enter the correct passocde */
upgradeStatusRouter.post('/addMember', [
    check('memberPasscode', 'Incorrect Passcode').not().bail().isEmpty().bail().isLength({ min: 5 }).bail()],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('upgradeStatus', { user: req.user, errors: errors.array() });
        } else {
            if (req.body.memberPasscode == 'cheetos') {
                User.findOne({
                    '_id': req.user.id
                })
                    .then((user) => {
                        var data = {
                            member: true
                        }
                        user.set(data);
                        user.save().then(() => {
                            res.redirect('/');
                        });
                    }).catch((err) => {
                        if (err) console.log(err);
                    });
            }
        }
    });

/* Make user an admin if they enter the correct passocde */
upgradeStatusRouter.post('/addAdmin', [
    check('adminPasscode', 'Incorrect Passcode').not().bail().isEmpty().bail().isLength({ min: 5 }).bail()],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('upgradeStatus', { user: req.user, errors: errors.array() });
        } else {
            if (req.body.adminPasscode == 'doritos') {
                User.findOne({
                    '_id': req.user.id
                })
                    .then((user) => {
                        var data = {
                            admin: true
                        }
                        user.set(data);
                        user.save().then(() => {
                            res.redirect('/');
                        });
                    }).catch((err) => {
                        if (err) console.log(err);
                    });
            }
        }
    });

/* Remove member status */
upgradeStatusRouter.post('/removeMember', function (req, res, next) {
    User.findOne({
        '_id': req.user.id
    })
        .then((user) => {
            var data = {
                member: false
            }
            user.set(data);
            user.save().then(() => {
                res.redirect('/upgradeStatus');
            });
        }).catch((err) => {
            if (err) console.log(err);
        });
});

/* Remove admin status */
upgradeStatusRouter.post('/removeAdmin', function (req, res, next) {
    User.findOne({
        '_id': req.user.id
    })
        .then((user) => {
            var data = {
                admin: false
            }
            user.set(data);
            user.save().then(() => {
                res.redirect('/upgradeStatus');
            });
        }).catch((err) => {
            if (err) console.log(err);
        });
});

module.exports = upgradeStatusRouter;