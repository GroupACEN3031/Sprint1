const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const File = new Schema({
    id: { type: String, required: false },
    userID: { type: String, required: true },
    projectID: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }

});

module.exports = mongoose.model("File", File);
