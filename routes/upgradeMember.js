var express = require('express');
var upgradeMemberRouter = express.Router();
var User = require('../models/userSchema');

/* GET users listing. */
upgradeMemberRouter.get('/', (req, res, next) => {
    console.log(req.user);
    res.render('upgradeMember', { title: 'Upgrade to Member Status', user: req.user });
});

upgradeMemberRouter.post('/', function (req, res, next) {
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
    //res.render('upgradeMember', { title: 'Upgrade to Member Status', user: req.user });
});

upgradeMemberRouter.post('/', function (req, res, next) {
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
    //res.render('upgradeMember', { title: 'Upgrade to Member Status', user: req.user });
});

upgradeMemberRouter.post('/removeMember', function (req, res, next) {
    User.findOne({
        '_id': req.user.id
    })
        .then((user) => {
            var data = {
                member: false
            }
            user.set(data);
            user.save().then(() => {
                res.redirect('/upgradeMember');
            });
        }).catch((err) => {
            if (err) console.log(err);
        });
    //res.render('upgradeMember', { title: 'Upgrade to Member Status', user: req.user });
});

upgradeMemberRouter.post('/removeAdmin', function (req, res, next) {
    User.findOne({
        '_id': req.user.id
    })
        .then((user) => {
            var data = {
                admin: false
            }
            user.set(data);
            user.save().then(() => {
                res.redirect('/upgradeMember');
            });
        }).catch((err) => {
            if (err) console.log(err);
        });
    //res.render('upgradeMember', { title: 'Upgrade to Member Status', user: req.user });
});

module.exports = upgradeMemberRouter;