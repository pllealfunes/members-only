var express = require('express');
var upgradeMemberRouter = express.Router();

/* GET users listing. */
upgradeMemberRouter.get('/', function (req, res, next) {
    res.render('upgradeMember', { title: 'Upgrade to Member Status', user: req.user });
});

module.exports = upgradeMemberRouter;