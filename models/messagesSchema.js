var mongoose = require("mongoose");
var moment = require('moment');

const Schema = mongoose.Schema;
let messagesSchema = new Schema({
    username: { type: String, minLength: 5, required: true },
    title: { type: String, minLength: 5, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, default: () => moment().format("MMMM Do YYYY, h:mm:ss a") }
});


module.exports = mongoose.model("Message", messagesSchema);