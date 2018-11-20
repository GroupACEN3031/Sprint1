const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Project = new Schema({
    id: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true }
});


module.exports = mongoose.model("Project", Project);
