const mongoose = require('mongoose');
const Listing = require('../models/listings.server.model.js');
const ObjectId = require('mongodb').ObjectID;

exports.create = (req, res) => {

    const listing = new Listing(req.body);

    if (req.results) {
        listing.coordinates = {
            latitude: req.results.lat,
            longitude: req.results.lng
        };
    }

    listing.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        } else {
            console.log("Listing created");
            res.json(listing);
        }
    });
};

exports.read = (req, res) => {

    const listing = req.listing;

    if (listing) {
        res.json(req.listing);

    } else {
        res.status(404).send("Listing does not exist");
    }

};

exports.update = (req, res) => {
    let listing = req.listing;
    const coordinates = req.results;
    const requestBody = req.body;
    const requestProperties = Object.keys(requestBody);

    if (listing) {
        requestProperties.forEach(p => {
            console.log("Property to update " + p);
            console.log(p + " before " + listing[p]);
            console.log(p + " in the request " + requestBody[p]);
            listing[p] = requestBody[p];
            console.log(p + " after " + listing[p]);
        });

        if (listing.address && coordinates) {
            listing.coordinates.longitude = coordinates.lng;
            listing.coordinates.latitude = coordinates.lat;
        }


        Listing.findOneAndUpdate({'code': listing.code}, {$set: listing}, {new: true}, (err) => {
            if (err) throw(err);
            res.status(200).send(listing);
        });
    } else {
        res.status(404).send("Listing does not exist");
    }
};

exports.delete = (req, res) => {
    const listing = req.listing;
    if (listing) {
        Listing.remove({'code': listing.code}, (err) => {
            if (err) throw(err);
            res.status(200).send("Removed successfully ");
        })
    } else {
        res.status(404).send("Listing does not exist");
    }

};

exports.list = (req, res) => {
    Listing.find()
        .sort('code')
        .exec((err, docs) => {
            if (err) {
                console.log("Error finding the properties");
                res.status(500).send(JSON.stringify(err));
            } else {
                res.send(docs);
            }
        })
};

exports.listingByID = function (req, res, next, id) {
    Listing.findById(id).exec((err, listing) => {
        if (err) {
            res.status(404).send("Property with id " + id + "was not found");
        } else {
            req.listing = listing;
            const findListing = (id) => {
                Listing.findOne(ObjectId(id), (err, res) => {
                    if (err) throw(err);
                    req.listing = res;
                })

            };
            findListing(id);
            next();
        }
    });
};