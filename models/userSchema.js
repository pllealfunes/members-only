var mongoose = require("mongoose");

const Schema = mongoose.Schema;
let userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    member: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }
});


module.exports = mongoose.model("User", userSchema);