var express = require('express');
var newMessageRouter = express.Router();
var Message = require('../models/messagesSchema');
const { check, validationResult } = require('express-validator');



newMessageRouter.get('/', (req, res, next) => {
    res.render('newMessage', { title: "New Message", user: req.user });
});


newMessageRouter.post('/', (req, res, next) => {
    //console.log(req);
    const newMessage = {
        username: req.body.username,
        title: req.body.title,
        message: req.body.message
    };
    let message = new Message(newMessage);
    message.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });
});








module.exports = newMessageRouter;
