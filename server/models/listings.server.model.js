const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    code: {type : String,required: true},
    name: {type : String,required: true},
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    address: String,
    created_at: Date,
    updated_at: Date
});


listingSchema.pre('save', function preSave(next) {
    this.updated_at = new Date();

    if (!this.created_at) {
        this.created_at = new Date();
    }

    next();
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;