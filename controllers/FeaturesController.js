const Feature = require("../models").Feature;
const Project = require("../models").Project;
const mongoose = require('mongoose');

exports.list = (req, res) => {
    Feature.find()
        .exec((err, docs) => {
            if (err) {
                console.log("Error finding the Feature");
                res.status(500).send(JSON.stringify(err));
            } else {
                console.log("Features : " + JSON.stringify(docs));
                res.send(docs);
            }
        })
};

exports.create = (req, res) => {
    const feature = new Feature(req.body);
    console.log("Feature in the request : " + feature);

    if (!mongoose.Types.ObjectId.isValid(feature.projectID)) {
        console.log("Invalid IDS");
        res.status(400).send("Invalid IDS");
    } else {

        if (feature) {

            Project.findOne({'_id': feature.projectID}, (err, projectFound) => {
                if (err) {
                    console.log(err);
                    res.status(400).send("Error.See logs for more details");
                }
                if (projectFound) {

                    Feature.findOne({'projectID': feature.projectID, 'title': feature.title}, (err, found) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send("Error.See logs for more details");
                        }
                        if (found) {
                            res.status(409).send("There is a feature with the same title in this project");
                        } else {

                            feature.save((err) => {
                                if (err) {
                                    console.log(err);
                                    res.status(400).send("Error.See logs for more details");
                                } else {
                                    console.log("Feature Saved");
                                    res.json(feature);
                                }
                            });


                        }
                    });

                } else {
                    res.status(404).send("Project does not exist.Please check your projectID and try again");
                }
            });


        }
    }
}
;


exports.delete = (req, res) => {
    const feature = new Feature(req.body);

    if (feature) {
        Feature.remove({'_id': feature.id}, (err) => {
            if (err) throw(err);
            res.status(200).send("Removed successfully ");
        })
    } else {
        res.status(404).send("Feature does not exist");
    }

};


exports.getById = (req, res) => {

    const ID = req.params.id;
    console.log("ID in the request " + ID);

    Feature.findOne({'_id': ID}, (err, found) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        }
        if (found) {
            res.status(200).send(found);
        } else {
            res.status(404).send("Feature does not exist");
        }
    });
};

exports.getByProjectID = (req, res) => {

    const ID = req.params.id;
    console.log("ID in the request " + ID);

    Feature.findOne({'projectID': ID}, (err, found) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        }
        if (found) {
            res.status(200).send(found);
        } else {
            res.status(404).send("This project does not have any feature");
        }
    });
};


exports.update = (req, res) => {
    const feature = new Feature(req.body);

    if (feature) {

        let updatedFeature = {
            projectID: feature.projectID,
            description: feature.description,
            title: feature.title,
            status: feature.status
        };

        if (feature.projectID) {

            if (mongoose.Types.ObjectId.isValid(feature.projectID)) {

                Project.findOne({'_id': feature.projectID}, (err, found) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Error");
                    }
                    if (found) {
                        console.log("Project exists");
                        updatedFeature.projectID = feature.projectID;

                        Feature.findOneAndUpdate({'_id': feature.id}, {$set: updatedFeature}, {new: true}, (err, found) => {
                            if (err) throw(err);

                            if (!found) {
                                res.status(404).send("Feature does not exist");

                            } else {

                                res.status(200).send("Feature Updated");
                            }

                        });


                    } else {
                        res.status(404).send("Project does not exist");
                    }
                });
            } else {
                res.status(400).send("Invalid projectID");

            }
        }

    }
};

