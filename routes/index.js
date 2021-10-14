var express = require('express');
var router = express.Router();
const Message = require('../models/messagesSchema');


/* GET home page. */
router.get('/', function (req, res, next) {
  Message.find({}).sort({ timestamp: -1 }).populate("username")
    .then((message) => {
      res.render('index', { title: 'Home', user: req.user, newMsg: message });
    })
    .catch((err) => {
      if (err) {
        res.end("ERROR!");
      }
    });
});

/* Allow admins to delete messages */
router.get('/delete/:messageId', function (req, res, next) {
  Message.deleteOne({
    '_id': req.params.messageId
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      if (err) console.log(err);
    });
});

module.exports = router;
