const Project = require("../models").Project;
const Comment = require("../models").Comment;
const File = require("../models").File;

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


exports.getById = (req, res) => {

    const ID = req.params.id;
    console.log("ID in the request " + ID);

    Project.findOne({'_id': ID}, (err, found) => {
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

exports.addComment = (req, res) => {

    const comment = new Comment(req.body);

    comment.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        } else {
            console.log("Comment Added");
            res.json(comment);
        }
    });
};


exports.getCommentsByProjectID = (req, res) => {

    const ID = req.params.id;
    console.log("ID in the request " + ID);

    Comment.find({'projectID': ID}, (err, found) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        }
        if (found) {
            res.status(200).send(found);
        } else {
            res.status(404).send("This project does not have any comments");
        }
    });
};

exports.deleteComment = (req, res) => {
    const comment = new Comment(req.body);

    if (comment) {
        Comment.remove({'_id': comment.id}, (err) => {
            if (err) throw(err);
            res.status(200).send("Removed successfully ");
        })
    } else {
        res.status(404).send("Comment does not exist");
    }

};



exports.addFile = (req, res) => {

    const file = new File(req.body);

    file.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        } else {
            console.log("File Added");
            res.json(file);
        }
    });
};


exports.getFilesByProjectID = (req, res) => {

    const ID = req.params.id;
    console.log("ID in the request " + ID);

    File.find({'projectID': ID}, (err, found) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error");
        }
        if (found) {
            res.status(200).send(found);
        } else {
            res.status(404).send("This project does not have any File");
        }
    });
};

exports.deleteFile = (req, res) => {
    const file = new File(req.body);

    if (file) {
        File.remove({'_id': file.id}, (err) => {
            if (err) throw(err);
            res.status(200).send("Removed successfully ");
        })
    } else {
        res.status(404).send("File does not exist");
    }

};