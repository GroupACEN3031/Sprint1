const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feature = new Schema({
    id: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectID: { type: String, required: true },
    status: { type: String, required: true }
});


module.exports = mongoose.model("Feature", Feature);
