const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const listingsRouter = require('../routes/listings.server.routes');
const getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function () {
    mongoose.connect(config.db.uri);

    const app = express();

    app.use(morgan('dev'));

    app.use(bodyParser.json());

    app.post('/api/coordinates', getCoordinates, (req, res) => {
        res.send(req.results);
    });

    app.use('/', express.static('client'));

    app.use('/api/listings', listingsRouter);

    app.get('*', (req, res) => {
        console.log("Redirecting to the home page");
        res.redirect('/');
    });

    return app;
};  