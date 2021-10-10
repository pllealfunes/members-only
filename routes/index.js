var express = require('express');
var router = express.Router();
const messages = require('../public/javascripts/messages');
const Message = require('../models/messagesSchema');


/* GET home page. */
router.get('/', function (req, res, next) {
  Message.find({}).sort({ timestamp: -1 })
    .then((message) => {
      res.render('index', { title: 'Home', user: req.user, messages: messages.messages, newMsg: message });
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
