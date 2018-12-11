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
    console.log("Bid order " + bid.order);

    if (!mongoose.Types.ObjectId.isValid(bid.teamID) || !mongoose.Types.ObjectId.isValid(bid.projectID)) {
        console.log("Invalid IDS");
        res.status(400).send("Invalid IDS");
    } else if (bid.order <= 0) {
        res.status(400).send("Order must be greater than 0");
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


exports.getById = (req, res) => {

    const ID = req.params.id;
    console.log("ID in the request " + ID);

    Bid.findOne({'_id': ID}, (err, found) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        }
        if (found) {
            res.status(200).send(found);
        } else {
            res.status(404).send("Project does not exist");
        }
    });
};


exports.update = (req, res) => {
    const bid = new Bid(req.body);

    if (bid) {

        const newBid = {
            projectID: bid.projectID,
            teamID: bid.teamID,
            order: bid.order
        };

        if (newBid.order <= 0) {
            res.status(400).send("Order must be greater than 0");
        } else {
            console.log("Bid after update " + JSON.stringify(newBid));

            Bid.findOneAndUpdate({
                "projectID": bid.projectID,
                "teamID": bid.teamID
            }, {$set: newBid}, {new: true}, (err, found) => {
                if (err) throw(err);

                if (!found) {
                    res.status(404).send("Bid does not exist");

                } else {

                    res.status(200).send("Bid Updated");
                }

            });
        }

    }
};