const config = require('../config/config');
const request = require('request');

module.exports = function (req, res, next) {
    if (req.body.address) {
        const addressTemp = req.body.address;
        const addressTemp2 = addressTemp.toLowerCase();
        const addressTemp3 = addressTemp2.replace(/\s/g, "%20");
        const addressTemp4 = addressTemp3.replace(/,/g, "%2C");

        const options = {
            q: addressTemp4,
            key: config.openCage.key,
            language: 'en',
            pretty: 1
        };

        request({
            url: 'https://api.opencagedata.com/geocode/v1/json',
            qs: options
        }, (error, response, body) => {
            if (error) {
                res.status(400).send(err);
            }

            const data = JSON.parse(body);
            req.results = data.results[0].geometry;
            next();
        });
    } else {
        next();
    }
};  