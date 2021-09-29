var mongoose = require("mongoose");

const Schema = mongoose.Schema;
let messagesSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date },
    admin: { type: Boolean }
});


module.exports = mongoose.model("Message", messagesSchema);