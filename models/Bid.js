const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bid = new Schema({
    id: { type: String, required: false },
    projectID: { type: String, required: true },
    teamID: { type: String, required: true },
    order: { type: Number, required: true }
});

module.exports = mongoose.model("Bid", Bid);