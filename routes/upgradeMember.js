var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('upgradeMember', { title: 'Upgrade to Member Status' });
});

module.exports = router;