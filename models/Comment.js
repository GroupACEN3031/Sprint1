const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
    id: { type: String, required: false },
    userID: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true },
    projectID: { type: String, required: true },

});

module.exports = mongoose.model("Comment", Comment);
