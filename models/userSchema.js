var mongoose = require("mongoose");

const Schema = mongoose.Schema;
let usersSchema = new Schema({
    full_name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    membership_status: { type: Boolean, required: true },
    admin: { type: Boolean }
});


module.exports = mongoose.model("User", usersSchema);