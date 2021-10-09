var express = require('express');
var newMessageRouter = express.Router();
var Message = require('../models/messagesSchema');
const { check, validationResult } = require('express-validator');



newMessageRouter.get('/', (req, res, next) => {
    res.render('newMessage', { title: "New Message", user: req.user });
});


newMessageRouter.post('/', [
    check('title', 'Title must have more than 5 characters').not().bail().isEmpty().bail().isLength({ min: 5 }).bail(),
    check('message', 'Message must have more than 5 characters').not().bail().isEmpty().bail().isLength({ min: 5 }).bail()],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            res.render('newMessage', { title: 'New Message', user: req.user, errors: errors.array() });
        }
        else {
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
        }
    });








module.exports = newMessageRouter;