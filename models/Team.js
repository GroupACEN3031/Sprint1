const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Team = new Schema({
    id: { type: String, required: false },
    name: { type: String, required: true },
    skills: { type: String, required: true },
    members: { type: String, required: true },
});


module.exports = mongoose.model("Team", Team);
