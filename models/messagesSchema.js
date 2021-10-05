var mongoose = require("mongoose");

const Schema = mongoose.Schema;
let messagesSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date }
});


module.exports = mongoose.model("Message", messagesSchema);