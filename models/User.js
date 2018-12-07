const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    id: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, required: true },
    skills: { type: String, required: true },
    teamID: { type: String, required: false }
});


module.exports = mongoose.model("User", User);
