const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const app = express();
const PORT = 90;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("client/build"));
app.use(routes);

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


// Set up promises with mongoose
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://");
