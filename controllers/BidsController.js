const Bid = require("../models").Bid;
const Team = require("../models").Team;
const Project = require("../models").Project;
const mongoose = require('mongoose');


exports.list = (req, res) => {
    Bid.find()
        .exec((err, docs) => {
            if (err) {
                console.log("Error finding the Bid");
                res.status(500).send(JSON.stringify(err));
            } else {
                console.log("Bids : " + JSON.stringify(docs));
                res.send(docs);
            }
        })
};

exports.create = (req, res) => {
    const bid = new Bid(req.body);
    console.log("Big in the request : " + bid);

    if (!mongoose.Types.ObjectId.isValid(bid.teamID) || !mongoose.Types.ObjectId.isValid(bid.projectID)) {
        console.log("Invalid IDS");
        res.status(400).send("Invalid IDS");
    } else {

        if (bid) {

            Team.findOne({'_id': bid.teamID}, (err, teamFound) => {
                if (err) {
                    console.log(err);
                    res.status(400).send("Error.See logs for more details");
                }
                if (teamFound) {

                    Project.findOne({'_id': bid.projectID}, (err, projectFound) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send("Error.See logs for more details");
                        }
                        if (projectFound) {

                            Bid.findOne({'projectID': bid.projectID, 'teamID': bid.teamID}, (err, found) => {
                                if (err) {
                                    console.log(err);
                                    res.status(400).send("Error.See logs for more details");
                                }
                                if (found) {
                                    res.status(409).send("Your team already bidded for this project");
                                } else {

                                    bid.save((err) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(400).send("Error.See logs for more details");
                                        } else {
                                            console.log("Bid sent");
                                            res.json(bid);
                                        }
                                    });


                                }
                            });

                        } else {
                            res.status(404).send("Project does not exist.Please check your projectID and try again");
                        }
                    });

                } else {
                    res.status(404).send("Team does not exist.Please check your teamID and try again");
                }
            });


        }
    }
};


exports.delete = (req, res) => {
    const bid = new Bid(req.body);

    if (bid) {
        Bid.remove({'_id': bid.id}, (err) => {
            if (err) throw(err);
            res.status(200).send("Removed successfully ");
        })
    } else {
        res.status(404).send("Bid does not exist");
    }

};

