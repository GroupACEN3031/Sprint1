const listings = require('../controllers/listings.server.controller.js');
const getCoordinates = require('../controllers/coordinates.server.controller.js');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(listings.list)
    .post(getCoordinates, listings.create);

router.route('/:listingId')
    .get(listings.read)
    .put(getCoordinates, listings.update)
    .delete(listings.delete);

router.param('listingId', listings.listingByID);

module.exports = router;