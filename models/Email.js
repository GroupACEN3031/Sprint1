const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Email = new Schema({
    body: { type: String, required: true },
    subject: { type: String, required: true },
    to: { type: String, required: true }
});

module.exports = mongoose.model("Email", Email);