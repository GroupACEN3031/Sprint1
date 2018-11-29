const Team = require("../models").Team;

exports.list = (req, res) => {
    Team.find()
        .exec((err, docs) => {
            if (err) {
                console.log("Error finding the Team");
                res.status(500).send(JSON.stringify(err));
            } else {
                console.log("Team : " + JSON.stringify(docs));
                res.send(docs);
            }
        })
};


exports.create = (req, res) => {
    let team = new Team(req.body);

    if (team) {

        Team.findOne({'name': team.name}, (err, found) => {
            if (err) {
                console.log(err);
                res.status(400).send("Error");
            }
            if (found) {
                res.status(409).send("Team already exists");
            } else {


                team.save((err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Error");
                    } else {
                        console.log("User created");
                        res.json(team);
                    }
                });


            }
        });
    }
};


exports.update = (req, res) => {
    const requestTeam = new Team(req.body);

    if (requestTeam) {

        const newTeam = {
            name : requestTeam.name,
            skills : requestTeam.skills,
            members : requestTeam.members
        };

        console.log("Team after update " + JSON.stringify(newTeam));

        Team.findOneAndUpdate({'name': requestTeam.name}, {$set: newTeam}, {new: true}, (err, found) => {
            if (err) throw(err);

            if (!found) {
                res.status(404).send("Team does not exist");

            } else {

                res.status(200).send("Team Updated");
            }

        });
    }
};


exports.delete = (req, res) => {
    const team = new Team(req.body);
    console.log("ID in the request " + team.id);

    if (team) {
        Team.remove({'_id': team.id}, (err) => {
            if (err) throw(err);
            res.status(200).send("Team Removed successfully ");
        })
    } else {
        res.status(404).send("Team does not exist");
    }

};

