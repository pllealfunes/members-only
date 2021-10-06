var mongoose = require("mongoose");

const Schema = mongoose.Schema;
let messagesSchema = new Schema({
    username: { type: String, minLength: 5, required: true },
    title: { type: String, minLength: 5, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date }
});

messagesSchema.pre('save', function (next) {
    this.createdAt = new Date();
    next();
});


module.exports = mongoose.model("Message", messagesSchema);