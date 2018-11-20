const Project = require("../models").Project;

exports.list = (req, res) => {

    Project.find()
        .exec((err, docs) => {
            if (err) {
                console.log("Error finding the Projects");
                res.status(500).send(JSON.stringify(err));
            } else {
                console.log("Projects : " + JSON.stringify(docs));
                res.send(docs);
            }
        })
};

exports.create = (req, res) => {

    const project = new Project(req.body);

    project.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        } else {
            console.log("Project created");
            res.json(project);
        }
    });
};

exports.delete = (req, res) => {
    const project = new Project(req.body);

    if (project) {
        Project.remove({'_id': project.id}, (err) => {
            if (err) throw(err);
            res.status(200).send("Removed successfully ");
        })
    } else {
        res.status(404).send("Project does not exist");
    }

};