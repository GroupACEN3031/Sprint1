const User = require("../models").User;
const crypto = require("crypto");
const Team = require("../models").Team;
const mongoose = require('mongoose');


exports.list = (req, res) => {
    User.find()
        .exec((err, docs) => {
            if (err) {
                console.log("Error finding the User");
                res.status(500).send(JSON.stringify(err));
            } else {
                console.log("User : " + JSON.stringify(docs));
                res.send(docs);
            }
        })
};


exports.create = (req, res) => {
    let user = new User(req.body);

    if (user) {

        User.findOne({'email': user.email}, (err, found) => {
            if (err) {
                console.log(err);
                res.status(400).send("Error");
            }
            if (found) {
                res.status(409).send("User already exists");
            } else {

                user.password = crypto.createHash('sha256').update(user.password).digest('base64');

                user.save((err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Error");
                    } else {
                        console.log("User created");
                        res.json(User);
                    }
                });


            }
        });
    }
};


function updateUser(requestUser, newUser, res) {

    User.findOneAndUpdate({'email': requestUser.email}, {$set: newUser}, {new: true}, (err, found) => {
        if (err) throw(err);

        if (!found) {
            res.status(404).send("User does not exist");

        } else {

            res.status(200).send("User Updated");
        }

    });

}


exports.update = (req, res) => {
    const requestUser = new User(req.body);

    if (requestUser) {

        let newUser = {
            firstName: requestUser.firstName,
            lastName: requestUser.password,
            password: crypto.createHash('sha256').update(requestUser.password).digest('base64'),
            photo: requestUser.photo,
            skills: requestUser.skills
        };

        if (requestUser.teamID) {

            if (mongoose.Types.ObjectId.isValid(requestUser.teamID)) {


                Team.findOne({'_id': requestUser.teamID}, (err, found) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Error");
                    }
                    if (found) {
                        console.log("Team exists");
                        newUser.teamID = requestUser.teamID;
                        updateUser(requestUser, newUser, res);
                    } else {
                        res.status(404).send("Team does not exist");
                    }
                });
            }else{
                res.status(400).send("Invalid teamID");

            }
        } else {
            updateUser(requestUser, newUser, res);
        }

    }
};


exports.delete = (req, res) => {
    const user = new User(req.body);
    console.log("ID in the request " + user.id);

    if (user) {
        User.remove({'_id': user.id}, (err) => {
            if (err) throw(err);
            res.status(200).send("User Removed successfully ");
        })
    } else {
        res.status(404).send("User does not exist");
    }

};



exports.getById = (req, res) => {

    const ID = req.params.id;
    console.log("ID in the request " + ID);

    User.findOne({'_id': ID}, (err, found) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        }
        if (found) {
            res.status(200).send(found);
        } else {
            res.status(404).send("User does not exist");
        }
    });
};
